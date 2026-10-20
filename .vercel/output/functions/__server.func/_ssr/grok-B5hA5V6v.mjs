import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grok-B5hA5V6v.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MODEL = "grok-4.5";
function requireKey() {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) throw new Error("La voz y el análisis de PekAI no están disponibles en este entorno.");
	return apiKey;
}
function parseJson(raw) {
	const trimmed = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
	const start = trimmed.indexOf("{");
	const end = trimmed.lastIndexOf("}");
	if (start === -1 || end === -1) throw new Error("PekAI no devolvió un informe válido.");
	return JSON.parse(trimmed.slice(start, end + 1));
}
async function grokJson(system, user, maxTokens) {
	const apiKey = requireKey();
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: MODEL,
			temperature: .4,
			max_tokens: maxTokens,
			response_format: { type: "json_object" },
			messages: [{
				role: "system",
				content: system
			}, {
				role: "user",
				content: user
			}]
		})
	});
	if (!res.ok) throw new Error(`Grok no ha podido responder (${res.status}). Inténtalo de nuevo.`);
	return parseJson((await res.json()).choices?.[0]?.message?.content ?? "");
}
function clip(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
function extractToken(body, depth = 0) {
	if (!body || typeof body !== "object" || depth > 3) return null;
	const record = body;
	for (const key of [
		"value",
		"token",
		"secret",
		"client_secret",
		"ephemeral_token"
	]) {
		const direct = record[key];
		if (typeof direct === "string" && direct.length > 8) return direct;
	}
	for (const value of Object.values(record)) if (value && typeof value === "object") {
		const nested = extractToken(value, depth + 1);
		if (nested) return nested;
	}
	return null;
}
var createVoiceToken_createServerFn_handler = createServerRpc({
	id: "a0fa9751602afbabaca1ed5fb82b99e9e3e9d4921200be76bf6c3e45b640ebfc",
	name: "createVoiceToken",
	filename: "src/pekai/grok.ts"
}, (opts) => createVoiceToken.__executeServer(opts));
var createVoiceToken = createServerFn({ method: "POST" }).handler(createVoiceToken_createServerFn_handler, async () => {
	const apiKey = requireKey();
	const res = await fetch("https://api.x.ai/v1/realtime/client_secrets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({ expires_after: { seconds: 600 } })
	});
	if (!res.ok) throw new Error(`No se ha podido abrir la sesión de voz (${res.status}).`);
	const token = extractToken(await res.json());
	if (!token) throw new Error("La sesión de voz no ha devuelto una credencial válida.");
	return { token };
});
var analyzeTurn_createServerFn_handler = createServerRpc({
	id: "063b67e5fa0e6eaea99528771fc6b62d932038b8a617c16c744054808e6a0b87",
	name: "analyzeTurn",
	filename: "src/pekai/grok.ts"
}, (opts) => analyzeTurn.__executeServer(opts));
var analyzeTurn = createServerFn({ method: "POST" }).validator((input) => ({
	turnText: clip(input?.turnText, 800),
	language: clip(input?.language, 40) || "Español",
	scenario: clip(input?.scenario, 160),
	targetLevel: clip(input?.targetLevel, 40) || "B1"
})).handler(analyzeTurn_createServerFn_handler, async ({ data }) => {
	if (!data.turnText) throw new Error("No hay frase que analizar.");
	const parsed = await grokJson("Eres PekAI, profesor de idiomas. Responde solo JSON en español de España. Sé cercano, breve y motivador.", `Analiza esta intervención de un estudiante de ${data.language}.
Frase: "${data.turnText}"
Escenario: ${data.scenario || "conversación libre"}
Nivel: ${data.targetLevel}

JSON con estas claves:
isCorrect (boolean),
explanation (1-2 frases en español de España),
correction (versión corregida o cadena vacía),
naturalAlternative (cómo lo diría un nativo),
pronunciationTip (consejo fonético breve),
vocabulary (array de 1 a 3 objetos con term, meaning, phonetic, example).`, 700);
	return {
		isCorrect: Boolean(parsed.isCorrect),
		explanation: parsed.explanation || "Sin observaciones.",
		correction: parsed.correction || "",
		naturalAlternative: parsed.naturalAlternative || parsed.correction || data.turnText,
		pronunciationTip: parsed.pronunciationTip || "",
		vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary.slice(0, 3) : []
	};
});
var suggestReplies_createServerFn_handler = createServerRpc({
	id: "dd939777b80aea276df36d8707687b9810dacf4e92927e4d2ed1e697512f7b93",
	name: "suggestReplies",
	filename: "src/pekai/grok.ts"
}, (opts) => suggestReplies.__executeServer(opts));
var suggestReplies = createServerFn({ method: "POST" }).validator((input) => ({
	lastTutorMessage: clip(input?.lastTutorMessage, 600) || "¡Hola! ¿En qué puedo ayudarte hoy?",
	language: clip(input?.language, 40) || "Español",
	scenario: clip(input?.scenario, 160),
	level: clip(input?.level, 40) || "B1"
})).handler(suggestReplies_createServerFn_handler, async ({ data }) => {
	const parsed = await grokJson("Eres PekAI, entrenador de conversación. Responde solo JSON.", `El tutor acaba de decir: "${data.lastTutorMessage}"
Escenario: ${data.scenario}
Idioma de práctica: ${data.language}
Nivel: ${data.level}

Genera exactamente 3 respuestas que el alumno podría decir ahora en ${data.language}:
una sencilla, una estándar y una expresiva.
JSON: { "suggestions": [ { "phrase", "phonetic", "translation", "level" } ] }
translation siempre en español de España. level es "sencilla", "estándar" o "expresiva".`, 600);
	return { suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 3) : [] };
});
var sessionSummary_createServerFn_handler = createServerRpc({
	id: "8ad20f42401ef0808989b2c769e8aa49f61747c5b3829be96a665f4f37906e6a",
	name: "sessionSummary",
	filename: "src/pekai/grok.ts"
}, (opts) => sessionSummary.__executeServer(opts));
var sessionSummary = createServerFn({ method: "POST" }).validator((input) => ({
	language: clip(input?.language, 40) || "Español",
	level: clip(input?.level, 40) || "B1",
	scenario: clip(input?.scenario, 160),
	history: (Array.isArray(input?.history) ? input.history : []).slice(-30).map((item) => ({
		role: item?.role === "user" ? "user" : "tutor",
		text: clip(item?.text, 400)
	})).filter((item) => item.text)
})).handler(sessionSummary_createServerFn_handler, async ({ data }) => {
	const conversation = data.history.map((item) => `${item.role === "user" ? "Alumno" : "Tutor"}: ${item.text}`).join("\n");
	const parsed = await grokJson("Eres un docente de PekAI. Evalúa con rigor amable, en español de España. Solo JSON.", `Evalúa esta práctica de ${data.language}, nivel ${data.level}.
Escenario: ${data.scenario || "libre"}

${conversation || "Diálogo introductorio breve."}

JSON:
overallScore, fluencyScore, grammarScore, vocabularyScore (enteros 0-100),
summary (párrafo alentador),
strengths (2 a 4 strings),
corrections (1 a 3 objetos learnerSaid, corrected, why; array vacío si no hay),
keyTerms (objetos term, definition, sampleSentence),
recommendedNextSteps (string).`, 900);
	return {
		overallScore: clampScore(parsed.overallScore),
		fluencyScore: clampScore(parsed.fluencyScore),
		grammarScore: clampScore(parsed.grammarScore),
		vocabularyScore: clampScore(parsed.vocabularyScore),
		summary: parsed.summary || "Buena sesión de práctica.",
		strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 4) : [],
		corrections: Array.isArray(parsed.corrections) ? parsed.corrections.slice(0, 3) : [],
		keyTerms: Array.isArray(parsed.keyTerms) ? parsed.keyTerms.slice(0, 6) : [],
		recommendedNextSteps: parsed.recommendedNextSteps || "Sigue practicando turnos un poco más largos."
	};
});
var translatePhrase_createServerFn_handler = createServerRpc({
	id: "6779aac2cc290fa803d21541ecdb26a7647482b314a59c0efd11253184ec258a",
	name: "translatePhrase",
	filename: "src/pekai/grok.ts"
}, (opts) => translatePhrase.__executeServer(opts));
var translatePhrase = createServerFn({ method: "POST" }).validator((input) => ({
	text: clip(input?.text, 800),
	language: clip(input?.language, 40) || "el idioma de práctica"
})).handler(translatePhrase_createServerFn_handler, async ({ data }) => {
	if (!data.text) throw new Error("No hay texto que traducir.");
	return { translation: (await grokJson("Traduce con naturalidad. Solo JSON.", `Traduce al español de España este texto, que está en ${data.language}. Conserva el tono.
Texto: "${data.text}"
JSON: { "translation": "..." }`, 300)).translation || "" };
});
var pronounce_createServerFn_handler = createServerRpc({
	id: "d4e2cf16d0b7c35507445d9f57fc79c34f6a1463edc181394ff81ca1325d248a",
	name: "pronounce",
	filename: "src/pekai/grok.ts"
}, (opts) => pronounce.__executeServer(opts));
var pronounce = createServerFn({ method: "POST" }).validator((input) => ({
	text: clip(input?.text, 280),
	language: toSpeechLanguage(clip(input?.language, 40))
})).handler(pronounce_createServerFn_handler, async ({ data }) => {
	if (!data.text) throw new Error("No hay texto que pronunciar.");
	const apiKey = requireKey();
	const res = await fetch("https://api.x.ai/v1/tts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			text: data.text,
			voice_id: "eve",
			language: data.language,
			speed: .92
		})
	});
	if (!res.ok) throw new Error(`No se ha podido pronunciar la frase (${res.status}).`);
	const bytes = new Uint8Array(await res.arrayBuffer());
	return {
		audioBase64: Buffer.from(bytes).toString("base64"),
		mimeType: "audio/mpeg"
	};
});
function clampScore(value) {
	const n = Number(value);
	if (!Number.isFinite(n)) return 0;
	return Math.max(0, Math.min(100, Math.round(n)));
}
function toSpeechLanguage(value) {
	const raw = value.toLowerCase();
	if (raw.startsWith("es") || raw.includes("espa")) return "es";
	if (raw.startsWith("en") || raw.includes("ingl")) return "en";
	if (raw.startsWith("fr") || raw.includes("franc")) return "fr";
	if (raw.startsWith("ja") || raw.includes("japon")) return "ja";
	if (raw.startsWith("de") || raw.includes("alem")) return "de";
	if (raw.startsWith("it") || raw.includes("ital")) return "it";
	if (raw.startsWith("zh") || raw.includes("mandar") || raw.includes("chino")) return "zh";
	if (raw.startsWith("ko") || raw.includes("corean")) return "ko";
	if (raw.startsWith("pt") || raw.includes("portug")) return "pt";
	if (/^[a-z]{2}(-[a-z]{2})?$/i.test(value)) return value;
	return "auto";
}
//#endregion
export { analyzeTurn_createServerFn_handler, createVoiceToken_createServerFn_handler, pronounce_createServerFn_handler, sessionSummary_createServerFn_handler, suggestReplies_createServerFn_handler, translatePhrase_createServerFn_handler };
