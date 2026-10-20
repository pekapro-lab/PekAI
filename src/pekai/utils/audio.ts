/**
 * Audio conversion and playback utilities for Gemini Live API
 */

export function downsampleTo16k(input: Float32Array, inputSampleRate: number): Float32Array {
  if (inputSampleRate === 16000) return input;
  const ratio = inputSampleRate / 16000;
  const newLength = Math.round(input.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetInput = 0;

  while (offsetResult < result.length) {
    const nextOffsetInput = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetInput; i < nextOffsetInput && i < input.length; i++) {
      accum += input[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetInput = nextOffsetInput;
  }
  return result;
}

export function floatTo16BitPCM(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output;
}

export function arrayBufferToBase64(buffer: ArrayBuffer | ArrayBufferLike): string {
  let binary = '';
  const bytes = new Uint8Array(buffer as ArrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function base64ToAudioBuffer(
  base64: string,
  ctx: AudioContext,
  sampleRate = 24000
): AudioBuffer {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // Gemini returns 16-bit PCM little-endian at 24kHz
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }

  const audioBuffer = ctx.createBuffer(1, float32.length, sampleRate);
  audioBuffer.getChannelData(0).set(float32);
  return audioBuffer;
}

export class LiveAudioPlayer {
  private ctx: AudioContext | null = null;
  private nextStartTime = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  constructor() {
    // Lazily initialized on first user gesture
  }

  private initCtx() {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx({ sampleRate: 24000 });
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public unlock() {
    this.initCtx();
  }

  public enqueueChunk(base64Audio: string) {
    this.initCtx();
    if (!this.ctx || !this.analyser) return;

    try {
      const audioBuffer = base64ToAudioBuffer(base64Audio, this.ctx, 24000);
      const source = this.ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.analyser);

      const currentTime = this.ctx.currentTime;
      // Schedule gaplessly with 25ms buffer for jitter
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime + 0.025;
      }

      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;

      this.activeSources.push(source);
      source.onended = () => {
        const idx = this.activeSources.indexOf(source);
        if (idx !== -1) {
          this.activeSources.splice(idx, 1);
        }
      };
    } catch (err) {
      console.error('Failed to enqueue audio chunk:', err);
    }
  }

  public stop() {
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch {
        // ignore
      }
    }
    this.activeSources = [];
    if (this.ctx) {
      this.nextStartTime = this.ctx.currentTime;
    }
  }

  public isPlaying(): boolean {
    return this.activeSources.length > 0;
  }

  public getAudioLevel(): number {
    if (!this.analyser || !this.dataArray || this.activeSources.length === 0) return 0;
    this.analyser.getByteFrequencyData(this.dataArray as any);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    const avg = sum / this.dataArray.length;
    return Math.min(1, avg / 128);
  }

  public close() {
    this.stop();
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export class LiveAudioRecorder {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private onAudioChunk: ((base64: string) => void) | null = null;

  public async start(onAudioChunk: (base64: string) => void) {
    this.onAudioChunk = onAudioChunk;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    this.stream = stream;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioCtx();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.source = this.ctx.createMediaStreamSource(stream);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source.connect(this.analyser);

    // Buffer size 4096 gives ~85ms chunks at 48kHz, responsive & smooth
    this.processor = this.ctx.createScriptProcessor(4096, 1, 1);
    this.source.connect(this.processor);
    this.processor.connect(this.ctx.destination);

    this.processor.onaudioprocess = (e) => {
      if (!this.onAudioChunk) return;
      const inputData = e.inputBuffer.getChannelData(0);

      // Downsample to 16kHz
      const downsampled = downsampleTo16k(inputData, this.ctx!.sampleRate);
      // Convert to 16-bit PCM Int16
      const pcm16 = floatTo16BitPCM(downsampled);
      // Base64 encode
      const base64 = arrayBufferToBase64(pcm16.buffer);
      this.onAudioChunk(base64);
    };
  }

  public getAudioLevel(): number {
    if (!this.analyser || !this.dataArray) return 0;
    this.analyser.getByteFrequencyData(this.dataArray as any);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    const avg = sum / this.dataArray.length;
    return Math.min(1, avg / 128);
  }

  public stop() {
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
      this.ctx = null;
    }
    this.onAudioChunk = null;
  }
}
