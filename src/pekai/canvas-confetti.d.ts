declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    origin?: { x?: number; y?: number };
    scalar?: number;
    ticks?: number;
    colors?: string[];
    zIndex?: number;
  }
  function confetti(options?: ConfettiOptions): Promise<undefined> | null;
  export default confetti;
}
