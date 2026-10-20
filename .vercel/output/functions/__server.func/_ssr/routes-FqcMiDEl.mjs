import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { A as CircleAlert, B as Activity, C as Flame, D as CirclePlus, E as Clock, F as Building2, I as Briefcase, L as Bookmark, M as ChevronRight, N as ChevronDown, O as CircleCheck, P as Check, R as BookOpen, S as Globe, T as Coffee, _ as LoaderCircle, a as Trash2, b as HeartHandshake, c as ShoppingBag, d as RotateCcw, f as Play, g as MapPin, h as MessageSquare, j as ChevronUp, k as CircleCheckBig, l as Send, m as MicOff, n as VolumeX, o as Sparkles, p as Mic, r as Volume2, s as SlidersVertical, t as X, u as Search, v as Lightbulb, w as Copy, x as Headphones, y as Layers, z as Award } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-FqcMiDEl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUPPORTED_LANGUAGES = [
	{
		id: "spanish",
		name: "Español",
		nativeName: "Español (España)",
		flag: "🇪🇸",
		defaultVoice: "Zephyr",
		localeCode: "es-ES",
		sampleGreeting: "¡Hola! ¿Cómo estás hoy? Estoy listo para practicar contigo.",
		suggestedTutors: [
			{
				name: "Mateo",
				role: "Barista acogedor y hablante nativo (Madrid)",
				voice: "Zephyr",
				bio: "Habla con cálida cadencia castellana. Muy paciente, apasionado de la gastronomía, el buen café y modismos cotidianos.",
				avatar: "☕"
			},
			{
				name: "Elena",
				role: "Guía cultural y narradora (Barcelona / Sevilla)",
				voice: "Kore",
				bio: "Pronunciación clara y vibrante. Ideal para escenarios de viajes, visitas a museos y vida diaria.",
				avatar: "🎨"
			},
			{
				name: "Carlos",
				role: "Entrenador profesional y de tecnología (Valencia)",
				voice: "Puck",
				bio: "Tono dinámico y profesional. Perfecto para simulaciones de entrevistas, debate y comunicación corporativa.",
				avatar: "💼"
			}
		]
	},
	{
		id: "english",
		name: "Inglés",
		nativeName: "English (UK / US)",
		flag: "🇬🇧",
		defaultVoice: "Zephyr",
		localeCode: "en-US",
		sampleGreeting: "Hello there! Great to meet you. What would you like to practice today?",
		suggestedTutors: [{
			name: "Sarah",
			role: "Periodista y entrenadora de acento (Londres)",
			voice: "Kore",
			bio: "Acento británico impecable y claro. Te ayuda con expresiones idiomáticas naturales, matices y fluidez.",
			avatar: "🎙️"
		}, {
			name: "James",
			role: "Fundador tecnológico y entrevistador (San Francisco)",
			voice: "Zephyr",
			bio: "Inglés americano estándar y actual. Excelente para entrevistas laborales y soltura coloquial.",
			avatar: "🚀"
		}]
	},
	{
		id: "french",
		name: "Francés",
		nativeName: "Français",
		flag: "🇫🇷",
		defaultVoice: "Kore",
		localeCode: "fr-FR",
		sampleGreeting: "Bonjour ! Ravi de faire ta connaissance. De quoi aimerais-tu parler aujourd’hui ?",
		suggestedTutors: [{
			name: "Amélie",
			role: "Anfitriona de bistró parisino y estudiante",
			voice: "Kore",
			bio: "Acento parisino pulcro y musical. Alentadora, le encanta hablar de gastronomía, libros y viajes de fin de semana.",
			avatar: "🥐"
		}, {
			name: "Lucas",
			role: "Comisario de arte y viajero (Lyon)",
			voice: "Zephyr",
			bio: "Ritmo pausado y reflexivo. Te guía con serenidad a través de los tiempos verbales pasados y futuros.",
			avatar: "🏛️"
		}]
	},
	{
		id: "japanese",
		name: "Japonés",
		nativeName: "日本語",
		flag: "🇯🇵",
		defaultVoice: "Zephyr",
		localeCode: "ja-JP",
		sampleGreeting: "こんにちは！お会いできて嬉しいです。今日はどんなことについて話しましょうか？",
		suggestedTutors: [{
			name: "Kenji (健二)",
			role: "Dueño de cafetería en Shinjuku y amigo local",
			voice: "Zephyr",
			bio: "Japonés conversacional natural de Tokio. Excelente para alternar entre habla informal y formas corteses (desu/masu).",
			avatar: "🍵"
		}, {
			name: "Sakura (さくら)",
			role: "Tutora y anfitriona cultural (Kioto)",
			voice: "Kore",
			bio: "Articulación nítida y amable. Maravillosa para estudiantes principiantes e intermedios.",
			avatar: "🌸"
		}]
	},
	{
		id: "german",
		name: "Alemán",
		nativeName: "Deutsch",
		flag: "🇩🇪",
		defaultVoice: "Fenrir",
		localeCode: "de-DE",
		sampleGreeting: "Hallo! Schön, dass du da bist. Worüber möchtest du heute sprechen?",
		suggestedTutors: [{
			name: "Hannah",
			role: "Dueña de panadería tradicional (Múnich)",
			voice: "Kore",
			bio: "Acento claro y estándar con gran calidez. Muy comprensiva con los géneros de sustantivos y casos.",
			avatar: "🥨"
		}, {
			name: "Stefan",
			role: "Organizador de comunidad tecnológica (Berlín)",
			voice: "Fenrir",
			bio: "Tono moderno y ágil. Ideal para conversaciones urbanas, aficiones y entornos de trabajo.",
			avatar: "💻"
		}]
	},
	{
		id: "italian",
		name: "Italiano",
		nativeName: "Italiano",
		flag: "🇮🇹",
		defaultVoice: "Puck",
		localeCode: "it-IT",
		sampleGreeting: "Ciao! Che bello sentirti. Di cosa ti va di chiacchierare oggi?",
		suggestedTutors: [{
			name: "Marco",
			role: "Maestro heladero (Florencia)",
			voice: "Puck",
			bio: "Cadencia toscana cantarina y expresiva. Apasionado de la cocina, las recetas familiares y la sobremesa.",
			avatar: "🍨"
		}, {
			name: "Sofia",
			role: "Historiadora del arte (Roma)",
			voice: "Kore",
			bio: "Voz articulada y cordial. Excelente para ampliar vocabulario descriptivo y contar anécdotas.",
			avatar: "🛵"
		}]
	},
	{
		id: "mandarin",
		name: "Chino Mandarín",
		nativeName: "中文 (普通话)",
		flag: "🇨🇳",
		defaultVoice: "Zephyr",
		localeCode: "zh-CN",
		sampleGreeting: "你好！很高兴和你练习中文。今天想聊些什么呢？",
		suggestedTutors: [{
			name: "Mei Ling (美玲)",
			role: "Maestra de casa de té tradicional (Chengdu)",
			voice: "Kore",
			bio: "Mandarín estándar cristalino. Te ayuda a interiorizar los cuatro tonos de manera natural.",
			avatar: "🫖"
		}, {
			name: "Li Wei (李伟)",
			role: "Guía gastronómico y amante de los mercados (Taipéi)",
			voice: "Zephyr",
			bio: "Conversación relajada y muy práctica para ganar soltura al hablar sin miedo al error.",
			avatar: "🥟"
		}]
	},
	{
		id: "korean",
		name: "Coreano",
		nativeName: "한국어",
		flag: "🇰🇷",
		defaultVoice: "Kore",
		localeCode: "ko-KR",
		sampleGreeting: "안녕하세요! 만나서 반가워요. 오늘 어떤 이야기 나눠볼까요?",
		suggestedTutors: [{
			name: "Ji-eun (지은)",
			role: "Música en cafetería indie (Hongdae, Seúl)",
			voice: "Kore",
			bio: "Coreano estándar de Seúl muy amigable (estilo 해요체). Entusiasta de las series, la música y la vida universitaria.",
			avatar: "🎧"
		}, {
			name: "Min-jun (민준)",
			role: "Chef de comida callejera y anfitrión local",
			voice: "Puck",
			bio: "Coreano coloquial y vivo. Enseña expresiones reales que se usan en mercados y reuniones de amigos.",
			avatar: "🥢"
		}]
	},
	{
		id: "portuguese",
		name: "Portugués",
		nativeName: "Português",
		flag: "🇵🇹",
		defaultVoice: "Puck",
		localeCode: "pt-BR",
		sampleGreeting: "Olá! Tudo bem com você? Vamos bater um papo bem descontraído hoje?",
		suggestedTutors: [{
			name: "Inês",
			role: "Librera en el centro histórico (Lisboa)",
			voice: "Kore",
			bio: "Pronunciación europea de Portugal clara y cadenciosa. Paciente y con un léxico rico.",
			avatar: "📚"
		}, {
			name: "Thiago",
			role: "Dueño de quiosco playero (Río de Janeiro)",
			voice: "Puck",
			bio: "Portugués brasileño espontáneo y acogedor. Perfecto para soltarse a hablar con naturalidad.",
			avatar: "🌴"
		}]
	}
];
var PRESET_SCENARIOS = [
	{
		id: "coffee_shop",
		title: "Pedir en una cafetería acogedora",
		subtitle: "Pide tu bebida preferida, pregunta por leche vegetal y elige una pieza de bollería.",
		category: "daily",
		icon: "Coffee",
		levelRecommendation: "A1",
		promptDescription: "Eres un camarero o barista simpático y cercano detrás de la barra de una cafetería de barrio. Saluda con entusiasmo al cliente, pregúntale qué le apetece tomar, ofrécele opciones de leche o endulzante y confirma la comanda con una sonrisa.",
		suggestedGoals: [
			"Saludar al barista y pedir un café o infusión",
			"Preguntar qué pastas o bollería fresca tienen hoy",
			"Especificar el tamaño de la taza o tipo de leche",
			"Pedir la cuenta y agradecer la atención"
		],
		starterPrompts: [
			"Hola, quisiera un café con leche y un cruasán, por favor.",
			"¿Qué piezas de bollería tenéis recién hechas?",
			"¿Tenéis leche de avena o soja?"
		],
		vocabularyHints: [
			{
				term: "café con leche",
				meaning: "Bebida de café con leche caliente"
			},
			{
				term: "cruasán / bollería",
				meaning: "Piezas dulces de panadería"
			},
			{
				term: "la cuenta",
				meaning: "El importe total a pagar"
			},
			{
				term: "para llevar",
				meaning: "Consumir fuera del establecimiento"
			}
		]
	},
	{
		id: "lost_directions",
		title: "Preguntar una dirección por la calle",
		subtitle: "Pregunta a una persona local cómo llegar al metro, la estación o la plaza mayor.",
		category: "travel",
		icon: "MapPin",
		levelRecommendation: "A2",
		promptDescription: "Eres un transeúnte local amable paseando por el centro de la ciudad. El estudiante te para educadamente para preguntarte cómo llegar a un monumento o estación. Dale indicaciones claras con puntos de referencia (girar a la izquierda tras la farmacia, seguir recto dos calles).",
		suggestedGoals: [
			"Parar educadamente a alguien y preguntar por un lugar",
			"Comprender giros e indicaciones (recto, a la derecha, al fondo)",
			"Averiguar si se puede ir a pie o si conviene coger autobús/metro",
			"Despedirse dando las gracias"
		],
		starterPrompts: [
			"Perdona, ¿me podrías indicar cómo llegar a la estación central?",
			"¿El museo de arte contemporáneo queda muy lejos andando?",
			"¿Qué línea de metro me viene mejor para ir al centro?"
		],
		vocabularyHints: [
			{
				term: "todo recto",
				meaning: "Continuar por la misma acera sin desviarse"
			},
			{
				term: "girar a la derecha / izquierda",
				meaning: "Cambiar de dirección en la esquina"
			},
			{
				term: "¿a cuánto está?",
				meaning: "Preguntar por el tiempo o distancia"
			},
			{
				term: "cruzar el paso de peatones",
				meaning: "Pasar al otro lado de la calzada"
			}
		]
	},
	{
		id: "market_bargain",
		title: "De compras en el rastro o mercadillo",
		subtitle: "Examina artesanía única, pregunta por precios y negocia con simpatía.",
		category: "travel",
		icon: "ShoppingBag",
		levelRecommendation: "B1",
		promptDescription: "Eres el artesano dueño de un puesto en un mercadillo dominical al aire libre. Vendes cerámica artesanal, láminas vintage y tejidos locales. Charla amistosamente con el comprador, explica cómo elaboras las piezas e intercambia un regateo cordial y divertido.",
		suggestedGoals: [
			"Preguntar el precio de un artículo",
			"Consultar de qué material está hecho o de dónde procede",
			"Proponer con respeto una pequeña rebaja si te llevas dos piezas",
			"Pagar en efectivo o con tarjeta bancaria"
		],
		starterPrompts: [
			"Hola, ¿cuánto cuesta este cuenco de cerámica artesanal?",
			"Si me llevo dos láminas, ¿me podrías hacer un pequeño descuento?",
			"¿Aceptas pago con tarjeta o solo en efectivo?"
		],
		vocabularyHints: [
			{
				term: "artesanal / hecho a mano",
				meaning: "Elaborado a mano por el creador"
			},
			{
				term: "descuento / rebaja",
				meaning: "Reducción en el importe"
			},
			{
				term: "tique / recibo",
				meaning: "Comprobante de compra"
			},
			{
				term: "cerámica / barro",
				meaning: "Material de alfarería tradicional"
			}
		]
	},
	{
		id: "job_interview",
		title: "Entrevista de trabajo y metas de carrera",
		subtitle: "Presenta tu trayectoria, responde a preguntas de situación y expón tus motivaciones.",
		category: "career",
		icon: "Briefcase",
		levelRecommendation: "B2",
		promptDescription: "Eres el responsable de selección de una destacada empresa internacional. Entrevistas al alumno para un puesto interesante. Hazle preguntas perspicaces y profesionales sobre su trayectoria, cómo gestionó un desafío reciente y qué valor aportaría al equipo.",
		suggestedGoals: [
			"Hacer una presentación profesional breve y concisa",
			"Explicar un reto real resuelto con éxito en el pasado",
			"Argumentar por qué te entusiasma esta oportunidad",
			"Hacer una pregunta inteligente sobre la dinámica de trabajo del equipo"
		],
		starterPrompts: [
			"Llevo trabajando en este sector durante los últimos tres años...",
			"Uno de los mayores desafíos a los que me enfrenté fue coordinar proyectos con plazos ajustados...",
			"¿Qué iniciativas clave tiene el equipo planificadas para los próximos meses?"
		],
		vocabularyHints: [
			{
				term: "trayectoria profesional",
				meaning: "Experiencia laboral acumulada"
			},
			{
				term: "puntos fuertes",
				meaning: "Habilidades destacadas"
			},
			{
				term: "trabajo en equipo",
				meaning: "Colaboración interdisciplinar"
			},
			{
				term: "crecimiento profesional",
				meaning: "Desarrollo de competencias en el puesto"
			}
		]
	},
	{
		id: "hotel_checkin",
		title: "Registro en el hotel y recomendaciones",
		subtitle: "Confirma tu reserva en recepción, pide una habitación tranquila y descubre planes locales.",
		category: "travel",
		icon: "Building2",
		levelRecommendation: "A2",
		promptDescription: "Eres el recepcionista atento y educado de un hotel boutique con encanto. Da la bienvenida al huésped, localiza su reserva, dale la tarjeta de la habitación, detalla el horario del desayuno y recomiéndale una taberna tradicional poco turística.",
		suggestedGoals: [
			"Indicar el nombre de la reserva y número de noches",
			"Solicitar una habitación en planta alta o con poco ruido",
			"Averiguar horarios de desayuno y la clave de la red Wi-Fi",
			"Pedir una recomendación para cenar auténtica comida local"
		],
		starterPrompts: [
			"Buenas tardes, tengo una reserva a mi nombre para pasar tres noches.",
			"¿Sería posible contar con una habitación tranquila en una planta alta?",
			"¿A qué hora se sirve el desayuno por las mañanas?"
		],
		vocabularyHints: [
			{
				term: "reserva confirmada",
				meaning: "Habitación contratada con antelación"
			},
			{
				term: "tarjeta magnética",
				meaning: "Llave electrónica de acceso"
			},
			{
				term: "desayuno incluido",
				meaning: "Comida matinal cubierta en la tarifa"
			},
			{
				term: "consigna de equipaje",
				meaning: "Lugar para guardar maletas tras el check-out"
			}
		]
	},
	{
		id: "making_friends",
		title: "Hacer amigos durante una cena o tapeo",
		subtitle: "Charla con soltura sobre música, platos favoritos, ciudades natales y aficiones.",
		category: "social",
		icon: "HeartHandshake",
		levelRecommendation: "B1",
		promptDescription: "Eres un amigo local que coincide con el alumno en una cena informal o de tapas entre conocidos. Conversad distendidamente sobre grupos de música preferidos, recetas de cocina, qué hacéis los fines de semana y haced preguntas curiosas y divertidas.",
		suggestedGoals: [
			"Contar de dónde eres y cuánto tiempo llevas viviendo allí",
			"Compartir tus aficiones favoritas o películas predilectas",
			"Preguntar por ferias locales, conciertos o excursiones de fin de semana",
			"Proponer quedar otro día para tomar un café o visitar una exposición"
		],
		starterPrompts: [
			"Y a ti, ¿qué estilo de música te gusta escuchar habitualmente?",
			"Me encanta probar platos nuevos, ¿cuál es tu comida favorita de tu tierra?",
			"¿Tienes planes para este fin de semana?"
		],
		vocabularyHints: [
			{
				term: "afición / pasatiempo",
				meaning: "Actividad que se disfruta en el tiempo libre"
			},
			{
				term: "tierra natal",
				meaning: "Lugar de origen o procedencia"
			},
			{
				term: "quedar para tomar algo",
				meaning: "Reunirse con amigos de manera informal"
			},
			{
				term: "recomendar un sitio",
				meaning: "Aconsejar un restaurante o local"
			}
		]
	},
	{
		id: "medical_pharmacy",
		title: "Consulta en la farmacia y síntomas",
		subtitle: "Explica molestias leves de resfriado, consulta posología y adquiere remedios.",
		category: "daily",
		icon: "Activity",
		levelRecommendation: "A2",
		promptDescription: "Eres un farmacéutico colegiado, empático y atento en una farmacia de barrio. El cliente no se encuentra del todo bien. Escucha atentamente sus síntomas (dolor de garganta, febrícula, congestión), pregunta si tiene alergias a medicamentos y explícale con claridad cómo tomar el tratamiento.",
		suggestedGoals: [
			"Explicar que tienes dolor de cabeza o malestar de garganta",
			"Preguntar si el medicamento necesita receta médica",
			"Entender cuántas tomas al día se deben realizar",
			"Consultar si produce somnolencia al conducir"
		],
		starterPrompts: [
			"Hola, he amanecido con bastante dolor de garganta y algo de destemplanza.",
			"¿Tiene algún jarabe o pastillas sin receta para aliviar la tos?",
			"¿Cada cuántas horas debo tomar este comprimido?"
		],
		vocabularyHints: [
			{
				term: "dolor de garganta",
				meaning: "Molestia al tragar o carraspera"
			},
			{
				term: "comprimidos / pastillas",
				meaning: "Formato sólido de medicamento"
			},
			{
				term: "antes / después de comer",
				meaning: "Momento de la toma respecto a las comidas"
			},
			{
				term: "receta médica",
				meaning: "Prescripción emitida por el médico"
			}
		]
	},
	{
		id: "free_talk",
		title: "Tertulia y conversación libre",
		subtitle: "Sin guion predeterminado. Debate sobre cine, actualidad, viajes o cualquier idea que surja.",
		category: "custom",
		icon: "Sparkles",
		levelRecommendation: "B2",
		promptDescription: "Eres un interlocutor culto, afable y curioso en una tertulia de café. El alumno desea una conversación abierta, orgánica y estimulante. Sigue su hilo con genuino interés, aporta reflexiones interesantes, haz preguntas abiertas y fomenta un debate ameno.",
		suggestedGoals: [
			"Plantear cualquier tema que te resulte fascinante",
			"Expresar una opinión propia y fundamentar tus motivos",
			"Preguntar al tutor su punto de vista o contrastes culturales",
			"Emplear conectores conversacionales y reacciones naturales"
		],
		starterPrompts: [
			"Estaba leyendo un artículo muy interesante sobre cómo la tecnología cambia nuestras ciudades...",
			"¿Qué opinas sobre las diferencias entre vivir en una gran metrópoli o en un pueblo tranquilo?",
			"¿Has visto alguna película o leído algún libro recientemente que te haya marcado?"
		],
		vocabularyHints: [
			{
				term: "desde mi punto de vista",
				meaning: "Fórmula para expresar opinión personal"
			},
			{
				term: "por otra parte",
				meaning: "Conector para contrastar ideas"
			},
			{
				term: "me llama mucho la atención",
				meaning: "Expresar sorpresa o interés genuino"
			},
			{
				term: "matiz cultural",
				meaning: "Peculiaridad propia de una sociedad"
			}
		]
	}
];
var PROFICIENCY_LEVELS = [
	{
		level: "A1",
		name: "Principiante",
		badge: "A1",
		description: "Frases lentas y sencillas, vocabulario básico cotidiano, guía muy paciente y comprensiva.",
		speed: "Pausado y claro (70%)"
	},
	{
		level: "A2",
		name: "Elemental",
		badge: "A2",
		description: "Frases simples, rutinas diarias, supervivencia en viajes y repetición nítida.",
		speed: "Moderado (85%)"
	},
	{
		level: "B1",
		name: "Intermedio",
		badge: "B1",
		description: "Ritmo conversacional, relatos en pasado y futuro, opiniones y situaciones del día a día.",
		speed: "Natural (100%)"
	},
	{
		level: "B2",
		name: "Intermedio Alto",
		badge: "B2",
		description: "Cadencia nativa, modismos ricos, debates, temas espontáneos y sentido del humor.",
		speed: "Nativo fluido (100%)"
	},
	{
		level: "C1",
		name: "Avanzado",
		badge: "C1",
		description: "Conceptos abstractos, réplica rápida en directo y profundos matices culturales.",
		speed: "Nativo ágil (110%)"
	}
];
/**
* Audio conversion and playback utilities for Gemini Live API
*/
function downsampleTo16k(input, inputSampleRate) {
	if (inputSampleRate === 16e3) return input;
	const ratio = inputSampleRate / 16e3;
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
function floatTo16BitPCM(input) {
	const output = new Int16Array(input.length);
	for (let i = 0; i < input.length; i++) {
		const s = Math.max(-1, Math.min(1, input[i]));
		output[i] = s < 0 ? s * 32768 : s * 32767;
	}
	return output;
}
function arrayBufferToBase64(buffer) {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
	return window.btoa(binary);
}
function base64ToAudioBuffer(base64, ctx, sampleRate = 24e3) {
	const binary = atob(base64);
	const len = binary.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
	const int16 = new Int16Array(bytes.buffer);
	const float32 = new Float32Array(int16.length);
	for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
	const audioBuffer = ctx.createBuffer(1, float32.length, sampleRate);
	audioBuffer.getChannelData(0).set(float32);
	return audioBuffer;
}
var LiveAudioPlayer = class {
	ctx = null;
	nextStartTime = 0;
	activeSources = [];
	analyser = null;
	dataArray = null;
	constructor() {}
	initCtx() {
		if (!this.ctx || this.ctx.state === "closed") {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			this.ctx = new AudioCtx({ sampleRate: 24e3 });
			this.analyser = this.ctx.createAnalyser();
			this.analyser.fftSize = 64;
			this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
			this.analyser.connect(this.ctx.destination);
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
	}
	unlock() {
		this.initCtx();
	}
	enqueueChunk(base64Audio) {
		this.initCtx();
		if (!this.ctx || !this.analyser) return;
		try {
			const audioBuffer = base64ToAudioBuffer(base64Audio, this.ctx, 24e3);
			const source = this.ctx.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(this.analyser);
			const currentTime = this.ctx.currentTime;
			if (this.nextStartTime < currentTime) this.nextStartTime = currentTime + .025;
			source.start(this.nextStartTime);
			this.nextStartTime += audioBuffer.duration;
			this.activeSources.push(source);
			source.onended = () => {
				const idx = this.activeSources.indexOf(source);
				if (idx !== -1) this.activeSources.splice(idx, 1);
			};
		} catch (err) {
			console.error("Failed to enqueue audio chunk:", err);
		}
	}
	stop() {
		for (const source of this.activeSources) try {
			source.stop();
			source.disconnect();
		} catch {}
		this.activeSources = [];
		if (this.ctx) this.nextStartTime = this.ctx.currentTime;
	}
	isPlaying() {
		return this.activeSources.length > 0;
	}
	getAudioLevel() {
		if (!this.analyser || !this.dataArray || this.activeSources.length === 0) return 0;
		this.analyser.getByteFrequencyData(this.dataArray);
		let sum = 0;
		for (let i = 0; i < this.dataArray.length; i++) sum += this.dataArray[i];
		const avg = sum / this.dataArray.length;
		return Math.min(1, avg / 128);
	}
	close() {
		this.stop();
		if (this.ctx && this.ctx.state !== "closed") {
			this.ctx.close();
			this.ctx = null;
		}
	}
};
var LiveAudioRecorder = class {
	ctx = null;
	stream = null;
	processor = null;
	source = null;
	analyser = null;
	dataArray = null;
	onAudioChunk = null;
	async start(onAudioChunk) {
		this.onAudioChunk = onAudioChunk;
		const stream = await navigator.mediaDevices.getUserMedia({ audio: {
			channelCount: 1,
			echoCancellation: true,
			noiseSuppression: true,
			autoGainControl: true
		} });
		this.stream = stream;
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		this.ctx = new AudioCtx();
		if (this.ctx.state === "suspended") await this.ctx.resume();
		this.source = this.ctx.createMediaStreamSource(stream);
		this.analyser = this.ctx.createAnalyser();
		this.analyser.fftSize = 64;
		this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		this.source.connect(this.analyser);
		this.processor = this.ctx.createScriptProcessor(4096, 1, 1);
		this.source.connect(this.processor);
		this.processor.connect(this.ctx.destination);
		this.processor.onaudioprocess = (e) => {
			if (!this.onAudioChunk) return;
			const base64 = arrayBufferToBase64(floatTo16BitPCM(downsampleTo16k(e.inputBuffer.getChannelData(0), this.ctx.sampleRate)).buffer);
			this.onAudioChunk(base64);
		};
	}
	getAudioLevel() {
		if (!this.analyser || !this.dataArray) return 0;
		this.analyser.getByteFrequencyData(this.dataArray);
		let sum = 0;
		for (let i = 0; i < this.dataArray.length; i++) sum += this.dataArray[i];
		const avg = sum / this.dataArray.length;
		return Math.min(1, avg / 128);
	}
	stop() {
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
		if (this.ctx && this.ctx.state !== "closed") {
			this.ctx.close();
			this.ctx = null;
		}
		this.onAudioChunk = null;
	}
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clip(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
var createVoiceToken = createServerFn({ method: "POST" }).handler(createSsrRpc("a0fa9751602afbabaca1ed5fb82b99e9e3e9d4921200be76bf6c3e45b640ebfc"));
var analyzeTurn = createServerFn({ method: "POST" }).validator((input) => ({
	turnText: clip(input?.turnText, 800),
	language: clip(input?.language, 40) || "Español",
	scenario: clip(input?.scenario, 160),
	targetLevel: clip(input?.targetLevel, 40) || "B1"
})).handler(createSsrRpc("063b67e5fa0e6eaea99528771fc6b62d932038b8a617c16c744054808e6a0b87"));
var suggestReplies = createServerFn({ method: "POST" }).validator((input) => ({
	lastTutorMessage: clip(input?.lastTutorMessage, 600) || "¡Hola! ¿En qué puedo ayudarte hoy?",
	language: clip(input?.language, 40) || "Español",
	scenario: clip(input?.scenario, 160),
	level: clip(input?.level, 40) || "B1"
})).handler(createSsrRpc("dd939777b80aea276df36d8707687b9810dacf4e92927e4d2ed1e697512f7b93"));
var sessionSummary = createServerFn({ method: "POST" }).validator((input) => ({
	language: clip(input?.language, 40) || "Español",
	level: clip(input?.level, 40) || "B1",
	scenario: clip(input?.scenario, 160),
	history: (Array.isArray(input?.history) ? input.history : []).slice(-30).map((item) => ({
		role: item?.role === "user" ? "user" : "tutor",
		text: clip(item?.text, 400)
	})).filter((item) => item.text)
})).handler(createSsrRpc("8ad20f42401ef0808989b2c769e8aa49f61747c5b3829be96a665f4f37906e6a"));
var translatePhrase = createServerFn({ method: "POST" }).validator((input) => ({
	text: clip(input?.text, 800),
	language: clip(input?.language, 40) || "el idioma de práctica"
})).handler(createSsrRpc("6779aac2cc290fa803d21541ecdb26a7647482b314a59c0efd11253184ec258a"));
var pronounce = createServerFn({ method: "POST" }).validator((input) => ({
	text: clip(input?.text, 280),
	language: toSpeechLanguage(clip(input?.language, 40))
})).handler(createSsrRpc("d4e2cf16d0b7c35507445d9f57fc79c34f6a1463edc181394ff81ca1325d248a"));
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
var VOICE_MAP = {
	Zephyr: "ara",
	Puck: "leo",
	Charon: "rex",
	Kore: "eve",
	Fenrir: "sal"
};
var SPEED_MAP = {
	A1: .8,
	A2: .9,
	B1: 1,
	B2: 1.05,
	C1: 1.15
};
var REALTIME_URL = "wss://api.x.ai/v1/realtime?model=grok-voice-latest";
function useLiveVoiceSession() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [micNotice, setMicNotice] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [interimUserText, setInterimUserText] = (0, import_react.useState)("");
	const [interimTutorText, setInterimTutorText] = (0, import_react.useState)("");
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [userAudioLevel, setUserAudioLevel] = (0, import_react.useState)(0);
	const [tutorAudioLevel, setTutorAudioLevel] = (0, import_react.useState)(0);
	const [durationSeconds, setDurationSeconds] = (0, import_react.useState)(0);
	const wsRef = (0, import_react.useRef)(null);
	const playerRef = (0, import_react.useRef)(null);
	const recorderRef = (0, import_react.useRef)(null);
	const isMutedRef = (0, import_react.useRef)(false);
	isMutedRef.current = isMuted;
	const streamingRef = (0, import_react.useRef)(false);
	const generationRef = (0, import_react.useRef)(0);
	const greetedRef = (0, import_react.useRef)(false);
	const currentTutorAccumulator = (0, import_react.useRef)("");
	const interimUserRef = (0, import_react.useRef)("");
	const animFrameRef = (0, import_react.useRef)(null);
	const timerIntervalRef = (0, import_react.useRef)(null);
	const updateAudioLevels = (0, import_react.useCallback)(() => {
		if (recorderRef.current && !isMutedRef.current) setUserAudioLevel(recorderRef.current.getAudioLevel());
		else setUserAudioLevel(0);
		setTutorAudioLevel(playerRef.current?.getAudioLevel() ?? 0);
		animFrameRef.current = requestAnimationFrame(updateAudioLevels);
	}, []);
	const commitTutor = (0, import_react.useCallback)((text) => {
		const clean = text.trim();
		if (!clean) return;
		setMessages((prev) => [...prev, {
			id: `tutor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			role: "tutor",
			text: clean,
			timestamp: Date.now()
		}]);
	}, []);
	const commitUser = (0, import_react.useCallback)((text) => {
		const clean = text.trim();
		if (!clean) return;
		setMessages((prev) => {
			const last = prev[prev.length - 1];
			if (last?.role === "user" && last.text === clean) return prev;
			return [...prev, {
				id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
				role: "user",
				text: clean,
				timestamp: Date.now()
			}];
		});
		interimUserRef.current = "";
		setInterimUserText("");
	}, []);
	const stopResources = (0, import_react.useCallback)(() => {
		streamingRef.current = false;
		if (timerIntervalRef.current) {
			clearInterval(timerIntervalRef.current);
			timerIntervalRef.current = null;
		}
		recorderRef.current?.stop();
		recorderRef.current = null;
		playerRef.current?.stop();
		playerRef.current?.close();
		playerRef.current = null;
		if (wsRef.current) {
			wsRef.current.onopen = null;
			wsRef.current.onmessage = null;
			wsRef.current.onerror = null;
			wsRef.current.onclose = null;
			try {
				wsRef.current.close();
			} catch {}
			wsRef.current = null;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		animFrameRef.current = requestAnimationFrame(updateAudioLevels);
		return () => {
			if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
			generationRef.current += 1;
			stopResources();
		};
	}, [stopResources, updateAudioLevels]);
	const startSession = async (params) => {
		const generation = ++generationRef.current;
		const alive = () => generation === generationRef.current;
		try {
			setStatus("connecting");
			setErrorMessage(null);
			setMicNotice(null);
			setDurationSeconds(0);
			setInterimUserText("");
			setInterimTutorText("");
			currentTutorAccumulator.current = "";
			interimUserRef.current = "";
			greetedRef.current = false;
			streamingRef.current = false;
			stopResources();
			generationRef.current = generation;
			const player = new LiveAudioPlayer();
			player.unlock();
			playerRef.current = player;
			const recorder = new LiveAudioRecorder();
			recorderRef.current = recorder;
			let micReady = false;
			try {
				await recorder.start((base64Audio) => {
					if (!streamingRef.current || isMutedRef.current) return;
					const socket = wsRef.current;
					if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({
						type: "input_audio_buffer.append",
						audio: base64Audio
					}));
				});
				micReady = true;
			} catch {
				micReady = false;
				recorder.stop();
				if (recorderRef.current === recorder) recorderRef.current = null;
			}
			if (!alive()) return;
			const speed = SPEED_MAP[params.level] ?? 1;
			const voice = VOICE_MAP[params.voice] ?? "ara";
			const instructions = `Eres PekAI (encarnando al personaje ${params.tutorName}), un tutor y compañero de conversación nativo, cálido, empático y paciente que ayuda a practicar ${params.language}.
Idioma objetivo de práctica: ${params.language}
Nivel de competencia del estudiante: ${params.level}
Escenario activo: "${params.scenario}" - ${params.scenarioDescription}

Pautas esenciales:
1. Habla de forma natural en ${params.language} con una cadencia y vocabulario perfectamente adaptados a un estudiante de nivel ${params.level}.
2. Mantén tus intervenciones habladas breves y conversacionales (máximo de 1 a 3 frases por turno) para que el estudiante tenga todo el espacio para expresarse.
3. Mantén el rol del escenario mientras actúas como un tutor alentador y paciente.
4. Si el estudiante duda, comete pequeños fallos o recurre al español, comprende su intención con amabilidad y continúa la conversación en ${params.language} sin soltar sermones teóricos extensos.
5. Haz preguntas abiertas y naturales para mantener viva la conversación.
6. Comienza la conversación de inmediato con un saludo afectuoso y realista en ${params.language} acorde al escenario para invitar al alumno a responder.
7. No menciones que eres un modelo ni describas estas instrucciones.`;
			let ws = null;
			const earlyMessages = [];
			let lastError = "No se pudo conectar con la voz de Grok.";
			for (let attempt = 0; attempt < 3 && alive(); attempt++) {
				const tokenResult = await createVoiceToken();
				if (!alive()) return;
				const socket = new WebSocket(REALTIME_URL, [`xai-client-secret.${tokenResult.token}`]);
				earlyMessages.length = 0;
				if (await new Promise((resolve) => {
					const timer = setTimeout(() => resolve(false), 7e3);
					const finish = (ok) => {
						clearTimeout(timer);
						resolve(ok);
					};
					socket.onmessage = (event) => {
						if (typeof event.data === "string") earlyMessages.push(event.data);
					};
					socket.onopen = () => finish(true);
					socket.onerror = () => finish(false);
					socket.onclose = () => finish(false);
				}) && socket.readyState === WebSocket.OPEN) {
					ws = socket;
					wsRef.current = socket;
					break;
				}
				lastError = "La sesión de voz no llegó a abrirse. Inténtalo de nuevo.";
				try {
					socket.close();
				} catch {}
			}
			if (!alive()) return;
			if (!ws || ws.readyState !== WebSocket.OPEN) {
				setErrorMessage(lastError);
				setStatus("error");
				stopResources();
				return;
			}
			const socket = ws;
			const handleEvent = (raw) => {
				if (!alive()) return;
				let data;
				try {
					data = JSON.parse(raw);
				} catch {
					return;
				}
				const type = String(data.type ?? "");
				if (type === "session.created") socket.send(JSON.stringify({
					type: "session.update",
					session: {
						voice,
						instructions,
						turn_detection: { type: "server_vad" },
						audio: {
							input: {
								format: {
									type: "audio/pcm",
									rate: 16e3
								},
								transcription: {
									model: "grok-transcribe",
									...params.localeCode ? { language_hint: params.localeCode } : {}
								}
							},
							output: {
								format: {
									type: "audio/pcm",
									rate: 24e3
								},
								speed
							}
						}
					}
				}));
				else if (type === "session.updated") {
					streamingRef.current = micReady;
					setStatus("listening");
					if (!micReady) setMicNotice("El micrófono no está disponible en esta vista. Puedes escribir y PekAI te responderá en voz.");
					if (!greetedRef.current) {
						greetedRef.current = true;
						socket.send(JSON.stringify({ type: "response.create" }));
					}
					if (!timerIntervalRef.current) timerIntervalRef.current = setInterval(() => {
						setDurationSeconds((prev) => prev + 1);
					}, 1e3);
				} else if (type === "response.output_audio.delta" || type === "response.audio.delta") {
					const delta = typeof data.delta === "string" ? data.delta : "";
					if (delta) {
						setStatus("speaking");
						playerRef.current?.enqueueChunk(delta);
					}
				} else if (type === "response.output_audio_transcript.delta" || type === "response.audio_transcript.delta") {
					const delta = typeof data.delta === "string" ? data.delta : "";
					if (delta) {
						currentTutorAccumulator.current += delta;
						setInterimTutorText(currentTutorAccumulator.current);
					}
				} else if (type === "response.output_audio_transcript.done" || type === "response.audio_transcript.done") {
					const finalText = typeof data.transcript === "string" && data.transcript || currentTutorAccumulator.current;
					commitTutor(finalText);
					currentTutorAccumulator.current = "";
					setInterimTutorText("");
				} else if (type === "input_audio_buffer.speech_started") {
					playerRef.current?.stop();
					setStatus("interrupted");
					if (currentTutorAccumulator.current.trim()) {
						commitTutor(currentTutorAccumulator.current);
						currentTutorAccumulator.current = "";
						setInterimTutorText("");
					}
				} else if (type === "conversation.item.input_audio_transcription.updated" || type === "conversation.item.input_audio_transcription.delta") {
					const text = String(data.transcript ?? data.text ?? data.delta ?? "");
					if (type.endsWith("updated") || typeof data.transcript === "string") {
						interimUserRef.current = text;
						setInterimUserText(text);
					} else if (text) {
						interimUserRef.current += text;
						setInterimUserText(interimUserRef.current);
					}
				} else if (type === "conversation.item.input_audio_transcription.completed") {
					const text = String(data.transcript ?? data.text ?? interimUserRef.current);
					commitUser(text);
				} else if (type === "response.created") {
					if (interimUserRef.current.trim()) commitUser(interimUserRef.current);
					setStatus("speaking");
				} else if (type === "response.done") {
					if (currentTutorAccumulator.current.trim()) {
						commitTutor(currentTutorAccumulator.current);
						currentTutorAccumulator.current = "";
						setInterimTutorText("");
					}
					setStatus("listening");
				} else if (type === "error") {
					const message = data.error?.message || (typeof data.message === "string" ? data.message : "Error en la sesión de voz.");
					lastError = message;
					if (!/no active response|cancellation/i.test(message)) setErrorMessage(message);
				}
			};
			socket.onclose = () => {
				if (!alive()) return;
				streamingRef.current = false;
				setStatus((current) => current === "ended" || current === "error" ? current : "idle");
			};
			socket.onerror = () => {
				if (!alive()) return;
				setErrorMessage("Error de conexión con la voz de PekAI. Intenta reconectar.");
				setStatus("error");
			};
			socket.onmessage = (event) => {
				if (typeof event.data === "string") handleEvent(event.data);
			};
			for (const raw of earlyMessages) handleEvent(raw);
			if (!micReady) setMicNotice("El micrófono no está disponible en esta vista. Puedes escribir y PekAI te responderá en voz.");
		} catch (err) {
			if (!alive()) return;
			console.error("Failed to start PekAI session:", err);
			setErrorMessage(err instanceof Error ? err.message : "No se pudo iniciar la sesión de voz con PekAI");
			setStatus("error");
			stopResources();
		}
	};
	const stopSession = () => {
		generationRef.current += 1;
		if (currentTutorAccumulator.current.trim()) {
			commitTutor(currentTutorAccumulator.current);
			currentTutorAccumulator.current = "";
		}
		stopResources();
		setInterimUserText("");
		setInterimTutorText("");
		setUserAudioLevel(0);
		setTutorAudioLevel(0);
		setStatus("ended");
	};
	const toggleMute = () => {
		setIsMuted((prev) => !prev);
	};
	const sendTextMessage = (text) => {
		const clean = text.trim();
		if (!clean) return;
		const socket = wsRef.current;
		if (!socket || socket.readyState !== WebSocket.OPEN) return;
		playerRef.current?.stop();
		try {
			socket.send(JSON.stringify({ type: "response.cancel" }));
		} catch {}
		socket.send(JSON.stringify({
			type: "conversation.item.create",
			item: {
				type: "message",
				role: "user",
				content: [{
					type: "input_text",
					text: clean
				}]
			}
		}));
		socket.send(JSON.stringify({ type: "response.create" }));
		setMessages((prev) => [...prev, {
			id: `user-${Date.now()}`,
			role: "user",
			text: clean,
			timestamp: Date.now()
		}]);
	};
	const clearMessages = () => {
		setMessages([]);
		setDurationSeconds(0);
		setStatus("idle");
		setMicNotice(null);
	};
	const updateMessageAnalysis = (messageId, analysis) => {
		setMessages((prev) => prev.map((msg) => msg.id === messageId ? {
			...msg,
			analysis,
			isAnalyzing: false
		} : msg));
	};
	const setMessageAnalyzing = (messageId, isAnalyzing) => {
		setMessages((prev) => prev.map((msg) => msg.id === messageId ? {
			...msg,
			isAnalyzing
		} : msg));
	};
	const setMessageTranslation = (messageId, translatedText) => {
		setMessages((prev) => prev.map((msg) => msg.id === messageId ? {
			...msg,
			translatedText,
			isTranslating: false
		} : msg));
	};
	return {
		status,
		errorMessage,
		micNotice,
		messages,
		interimUserText,
		interimTutorText,
		isMuted,
		userAudioLevel,
		tutorAudioLevel,
		durationSeconds,
		startSession,
		stopSession,
		toggleMute,
		sendTextMessage,
		clearMessages,
		updateMessageAnalysis,
		setMessageAnalyzing,
		setMessageTranslation
	};
}
var ScenarioSelector = ({ selectedLanguage, onSelectLanguage, selectedLevel, onSelectLevel, selectedVoice, onSelectVoice, selectedTutorName, onSelectTutorName, selectedScenario, onSelectScenario, onStartConversation, savedVocabCount, onOpenVocabVault }) => {
	const [filterCategory, setFilterCategory] = (0, import_react.useState)("all");
	const [showCustomModal, setShowCustomModal] = (0, import_react.useState)(false);
	const [customTitle, setCustomTitle] = (0, import_react.useState)("");
	const [customDescription, setCustomDescription] = (0, import_react.useState)("");
	const filteredScenarios = PRESET_SCENARIOS.filter((sc) => {
		if (filterCategory === "all") return true;
		return sc.category === filterCategory;
	});
	const getScenarioIcon = (iconName) => {
		switch (iconName) {
			case "Coffee": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "w-5 h-5" });
			case "MapPin": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5" });
			case "ShoppingBag": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-5 h-5" });
			case "Briefcase": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-5 h-5" });
			case "Building2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-5 h-5" });
			case "HeartHandshake": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "w-5 h-5" });
			case "Activity": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-5 h-5" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" });
		}
	};
	const handleCreateCustomScenario = (e) => {
		e.preventDefault();
		if (!customTitle.trim()) return;
		onSelectScenario({
			id: `custom-${Date.now()}`,
			title: customTitle.trim(),
			subtitle: "Custom user-defined conversation scenario",
			category: "custom",
			icon: "Sparkles",
			levelRecommendation: selectedLevel,
			promptDescription: customDescription.trim() || `The user wants to practice: ${customTitle}`,
			suggestedGoals: [
				"Practice active vocabulary",
				"Ask relevant questions",
				"Maintain natural conversational rhythm"
			],
			starterPrompts: [`Hello, I would like to talk about ${customTitle}.`],
			vocabularyHints: []
		});
		setShowCustomModal(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto min-w-0 px-4 py-8 space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Impulsado por Grok Voice" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight",
						children: "PekAI · Compañero de Conversación"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-stone-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed",
						children: "Practica conversación espontánea con un compañero de idiomas por voz en tiempo real. Habla por el micrófono, escucha respuestas instantáneas y recibe correcciones gramaticales al momento."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onOpenVocabVault,
						className: "flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-xl text-xs font-medium text-stone-300 transition-all shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "w-4 h-4 text-amber-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bóveda de Vocabulario" }),
							savedVocabCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold",
								children: savedVocabCount
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-semibold text-stone-200 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1. Elige el idioma de práctica" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-stone-500",
						children: [
							"Seleccionado: ",
							selectedLanguage.name,
							" (",
							selectedLanguage.nativeName,
							")"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
					children: SUPPORTED_LANGUAGES.map((lang) => {
						const isSelected = selectedLanguage.id === lang.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								onSelectLanguage(lang);
								onSelectVoice(lang.defaultVoice);
								if (lang.suggestedTutors[0]) onSelectTutorName(lang.suggestedTutors[0].name);
							},
							className: `flex flex-col text-left p-3.5 rounded-xl border transition-all text-sm group ${isSelected ? "bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30" : "bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between w-full mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: lang.flag
									}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-amber-400" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-stone-200 group-hover:text-white",
									children: lang.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-stone-400 font-normal",
									children: lang.nativeName
								})
							]
						}, lang.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-semibold text-stone-200 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "w-4 h-4 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2. Nivel de competencia objetivo" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
						children: PROFICIENCY_LEVELS.map((pl) => {
							const isSelected = selectedLevel === pl.level;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onSelectLevel(pl.level),
								className: `flex flex-col text-left p-3 rounded-xl border transition-all ${isSelected ? "bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30" : "bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300",
											children: pl.badge
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-stone-400 font-medium",
											children: pl.speed
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-stone-200 text-sm",
										children: pl.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-stone-400 mt-1 line-clamp-2",
										children: pl.description
									})
								]
							}, pl.level);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-semibold text-stone-200 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "w-4 h-4 text-indigo-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3. Tutor de PekAI y voz" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: selectedLanguage.suggestedTutors.map((tutor) => {
							const isSelected = selectedTutorName === tutor.name;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									onSelectTutorName(tutor.name);
									onSelectVoice(tutor.voice);
								},
								className: `w-full flex items-start gap-3 p-3 text-left rounded-xl border transition-all ${isSelected ? "bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/30" : "bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl p-1 bg-stone-800 rounded-lg shrink-0",
									children: tutor.avatar
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-stone-200 text-sm",
												children: tutor.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-indigo-400 font-medium",
												children: ["Voz: ", tutor.voice]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-stone-400 block truncate",
											children: tutor.role
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-stone-500 mt-1 line-clamp-2",
											children: tutor.bio
										})
									]
								})]
							}, tutor.name);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-semibold text-stone-200 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4. Elige una situación de la vida real" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-stone-400 mt-0.5",
						children: "Escenarios inmersivos para practicar de inmediato o crea un tema a tu medida"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full min-w-0 items-center gap-1 overflow-x-auto bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs",
						children: [[
							{
								id: "all",
								label: "Todos"
							},
							{
								id: "daily",
								label: "Día a día"
							},
							{
								id: "travel",
								label: "Viajes"
							},
							{
								id: "social",
								label: "Social"
							},
							{
								id: "career",
								label: "Profesional"
							}
						].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilterCategory(cat.id),
							className: `px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${filterCategory === cat.id ? "bg-stone-800 text-stone-100 shadow-sm" : "text-stone-400 hover:text-stone-200"}`,
							children: cat.label
						}, cat.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowCustomModal(true),
							className: "px-3 py-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-stone-800 font-medium whitespace-nowrap flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Crear libre" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
					children: filteredScenarios.map((sc) => {
						const isSelected = selectedScenario.id === sc.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onSelectScenario(sc),
							className: `flex flex-col text-left p-4 rounded-xl border transition-all relative group ${isSelected ? "bg-amber-500/10 border-amber-500/70 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30" : "bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `p-2 rounded-lg ${isSelected ? "bg-amber-500/20 text-amber-300" : "bg-stone-800 text-stone-300 group-hover:text-white"}`,
										children: getScenarioIcon(sc.icon)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-stone-500 font-medium",
										children: ["Rec. ", sc.levelRecommendation]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-stone-100 text-base leading-snug",
									children: sc.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-stone-400 mt-1.5 leading-relaxed line-clamp-2",
									children: sc.subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-3 border-t border-stone-800/80 w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1",
										children: "Objetivos a practicar:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "text-xs text-stone-400 space-y-1",
										children: sc.suggestedGoals.slice(0, 2).map((goal, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-1.5 truncate",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: goal
											})]
										}, idx))
									})]
								})
							]
						}, sc.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-r from-stone-900 via-stone-900 to-stone-800 border border-stone-700/80 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-center md:text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-stone-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber-400 font-semibold",
									children: selectedLanguage.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Nivel ", selectedLevel] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Tutor: ", selectedTutorName] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-xl sm:text-2xl font-bold text-white tracking-tight",
							children: ["Todo listo para hablar en: ", selectedScenario.title]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-stone-400 max-w-xl",
							children: selectedScenario.subtitle
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onStartConversation,
					className: "w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-amber-900/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shrink-0 cursor-pointer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "w-5 h-5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Iniciar conversación de voz" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
					]
				})]
			}),
			showCustomModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-stone-100 mb-1",
							children: "Crear situación de rol personalizada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-stone-400 mb-4",
							children: "Describe cualquier escenario que desees practicar con tu tutor PekAI."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCreateCustomScenario,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-stone-300 mb-1",
									children: "Título del tema o situación"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: customTitle,
									onChange: (e) => setCustomTitle(e.target.value),
									placeholder: "Ej.: Pedir unas tapas en una taberna de Madrid",
									required: true,
									className: "w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-stone-300 mb-1",
									children: "Detalles del personaje y contexto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: customDescription,
									onChange: (e) => setCustomDescription(e.target.value),
									placeholder: "Ej.: Eres el camarero de una taberna castiza. Te pido una ración de bravas y una tortilla jugosa y charlamos sobre el fútbol o el tiempo.",
									rows: 3,
									className: "w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowCustomModal(false),
										className: "px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors",
										children: "Guardar escenario"
									})]
								})
							]
						})
					]
				})
			})
		]
	});
};
var AudioVisualizerOrb = ({ status, userAudioLevel, tutorAudioLevel, isMuted, tutorName, interimUserText, interimTutorText, language }) => {
	const isSpeaking = status === "speaking" || tutorAudioLevel > .05;
	const isListening = status === "listening" || !isSpeaking && userAudioLevel > .04;
	const isConnecting = status === "connecting";
	const tutorScale = 1 + tutorAudioLevel * .45;
	const userScale = 1 + userAudioLevel * .45;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-6 relative select-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: {
						scale: isSpeaking ? tutorScale * 1.25 : isListening ? userScale * 1.2 : 1,
						opacity: isSpeaking ? .35 : isListening ? .3 : .15
					},
					transition: { duration: .15 },
					className: `absolute inset-0 rounded-full blur-2xl ${isSpeaking ? "bg-amber-500" : isListening ? "bg-emerald-500" : isConnecting ? "bg-indigo-500" : "bg-stone-700"}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: {
						scale: isSpeaking ? [
							1,
							1.15,
							1
						] : isListening ? [
							1,
							1.08,
							1
						] : [
							1,
							1.03,
							1
						],
						rotate: [
							0,
							180,
							360
						]
					},
					transition: {
						scale: {
							repeat: Infinity,
							duration: isSpeaking ? 1.2 : 2.5,
							ease: "easeInOut"
						},
						rotate: {
							repeat: Infinity,
							duration: 16,
							ease: "linear"
						}
					},
					className: `absolute w-full h-full rounded-full border border-dashed transition-colors duration-500 ${isSpeaking ? "border-amber-400/40" : isListening ? "border-emerald-400/40" : "border-stone-700/60"}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { scale: isSpeaking ? tutorScale : isListening ? userScale : 1 },
					transition: {
						duration: .08,
						ease: "easeOut"
					},
					className: `absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border transition-colors duration-300 ${isSpeaking ? "border-amber-300/60 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.2)]" : isListening ? "border-emerald-300/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]" : "border-stone-700 bg-stone-800/40"}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					animate: { scale: isSpeaking ? 1 + tutorAudioLevel * .25 : isListening ? 1 + userAudioLevel * .2 : 1 },
					transition: { duration: .06 },
					className: `w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center relative shadow-xl backdrop-blur-md transition-colors duration-500 ${isSpeaking ? "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 text-amber-50 shadow-amber-900/40" : isListening ? "bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 text-emerald-50 shadow-emerald-950/40" : isConnecting ? "bg-gradient-to-br from-indigo-600 to-purple-800 text-indigo-100" : "bg-stone-800 text-stone-400"}`,
					children: [isConnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-white" }) : isSpeaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-8 h-8 animate-pulse text-white drop-shadow" }) : isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-8 h-8 text-rose-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-8 h-8 text-white drop-shadow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 mt-2 h-4",
						children: [
							.4,
							.9,
							.6,
							1,
							.7,
							.5
						].map((factor, i) => {
							const barHeight = Math.max(3, Math.min(16, (isSpeaking ? tutorAudioLevel : isListening ? userAudioLevel : .08) * 20 * factor + 3));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { height: barHeight },
								transition: { duration: .05 },
								className: "w-1 bg-white/80 rounded-full"
							}, i);
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col items-center text-center max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 text-xs tracking-wide uppercase font-medium",
				children: isConnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-indigo-400",
					children: "Conectando con PekAI en tiempo real..."
				}) : isSpeaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-amber-400 flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" }),
						tutorName,
						" está hablando en ",
						language
					]
				}) : isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-emerald-400 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 inline-block" }), isMuted ? "Micrófono silenciado" : "Escuchando... Habla con naturalidad"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-stone-400",
					children: "Listo para practicar con PekAI"
				})
			}), (interimUserText || interimTutorText) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 px-4 py-2 bg-stone-900/90 border border-stone-800 rounded-xl text-sm max-w-lg shadow-sm",
				children: interimTutorText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-amber-200/90 italic font-normal",
					children: [
						"\"",
						interimTutorText,
						"\""
					]
				}) : interimUserText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-emerald-200/90 italic font-normal",
					children: [
						"\"",
						interimUserText,
						"...\""
					]
				}) : null
			})]
		})]
	});
};
var LiveConversationRoom = ({ language, scenario, level, tutorName, status, errorMessage, messages, interimUserText, interimTutorText, isMuted, userAudioLevel, tutorAudioLevel, durationSeconds, onToggleMute, onSendText, onEndSession, onSaveVocabulary, savedVocabulary, onUpdateAnalysis, onSetMessageAnalyzing, onSetTranslation, micNotice }) => {
	const [inputText, setInputText] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("suggestions");
	const [expandedAnalysisIds, setExpandedAnalysisIds] = (0, import_react.useState)({});
	const [showTranslations, setShowTranslations] = (0, import_react.useState)({});
	const [completedGoals, setCompletedGoals] = (0, import_react.useState)({});
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = (0, import_react.useState)(false);
	const [playingAudioKey, setPlayingAudioKey] = (0, import_react.useState)(null);
	const messagesEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages,
		interimUserText,
		interimTutorText
	]);
	(0, import_react.useEffect)(() => {
		const lastTutorMsg = [...messages].reverse().find((m) => m.role === "tutor");
		if (lastTutorMsg) fetchSuggestions(lastTutorMsg.text);
	}, [messages.filter((m) => m.role === "tutor").length]);
	const fetchSuggestions = async (tutorMsg) => {
		try {
			setIsLoadingSuggestions(true);
			const data = await suggestReplies({ data: {
				lastTutorMessage: tutorMsg,
				language: language.name,
				scenario: scenario.title,
				level
			} });
			if (data.suggestions) setSuggestions(data.suggestions);
		} catch (err) {
			console.error("Failed to fetch suggestions:", err);
		} finally {
			setIsLoadingSuggestions(false);
		}
	};
	const handleAnalyzeTurn = async (message) => {
		if (message.analysis || message.isAnalyzing) {
			setExpandedAnalysisIds((prev) => ({
				...prev,
				[message.id]: !prev[message.id]
			}));
			return;
		}
		try {
			onSetMessageAnalyzing(message.id, true);
			const data = await analyzeTurn({ data: {
				turnText: message.text,
				language: language.name,
				scenario: scenario.title,
				targetLevel: level
			} });
			onUpdateAnalysis(message.id, data);
			setExpandedAnalysisIds((prev) => ({
				...prev,
				[message.id]: true
			}));
		} catch (err) {
			console.error("Turn analysis error:", err);
		} finally {
			onSetMessageAnalyzing(message.id, false);
		}
	};
	const playPronunciation = async (text, key) => {
		try {
			setPlayingAudioKey(key);
			const data = await pronounce({ data: {
				text,
				language: language.localeCode
			} });
			if (data.audioBase64) {
				const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
				audio.onended = () => setPlayingAudioKey(null);
				audio.onerror = () => setPlayingAudioKey(null);
				await audio.play();
			} else setPlayingAudioKey(null);
		} catch (err) {
			console.error("Failed to play pronunciation:", err);
			setPlayingAudioKey(null);
		}
	};
	const handleSend = (e) => {
		e.preventDefault();
		if (!inputText.trim()) return;
		onSendText(inputText.trim());
		setInputText("");
	};
	const formatTimer = (totalSeconds) => {
		const mins = Math.floor(totalSeconds / 60);
		const secs = totalSeconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	const userMsgCount = messages.filter((m) => m.role === "user").length;
	const tutorMsgCount = messages.filter((m) => m.role === "tutor").length;
	const totalTurns = userMsgCount + tutorMsgCount;
	const userWordsCount = messages.filter((m) => m.role === "user").reduce((acc, m) => acc + m.text.trim().split(/\s+/).length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col h-[calc(100dvh-4.75rem)] max-w-7xl mx-auto px-2 sm:px-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 shrink-0 mb-3 shadow-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl",
					children: language.flag
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm sm:text-base font-bold text-white tracking-tight",
						children: scenario.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-stone-400 hidden sm:inline",
						children: ["· ", language.name]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-stone-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-amber-400 font-medium",
							children: ["Tutor: ", tutorName]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-stone-400",
							children: level
						})
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono font-medium text-stone-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTimer(durationSeconds) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onToggleMute,
						title: isMuted ? "Activar micrófono" : "Silenciar micrófono",
						className: `p-2 rounded-xl border transition-colors ${isMuted ? "bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900/60" : "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700"}`,
						children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-4 h-4 text-emerald-400" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onEndSession,
						className: "px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 rounded-xl text-xs font-semibold transition-all shadow-sm",
						children: "Finalizar y resumen"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 flex flex-col bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 border-b border-stone-800/80 bg-gradient-to-b from-stone-950/80 to-stone-900/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioVisualizerOrb, {
								status,
								userAudioLevel,
								tutorAudioLevel,
								isMuted,
								tutorName,
								interimUserText,
								interimTutorText,
								language: language.name
							}),
							errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 mb-3 p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-300",
								children: errorMessage
							}),
							micNotice && !errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 mb-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200",
								children: micNotice
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto p-4 space-y-4",
						children: [
							messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-full flex flex-col items-center justify-center text-center text-stone-500 py-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-8 h-8 mb-2 opacity-50" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Tu conversación en vivo aparecerá aquí"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-stone-600 mt-1 max-w-xs",
										children: [tutorName, " te está saludando. ¡Responde por el micrófono o con el chat inferior!"]
									})
								]
							}),
							messages.map((msg) => {
								const isUser = msg.role === "user";
								const isExpanded = !!expandedAnalysisIds[msg.id];
								const showTrans = !!showTranslations[msg.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-[11px] text-stone-500 px-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-stone-400",
													children: isUser ? "Tú" : tutorName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(msg.timestamp).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												}) })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? "bg-amber-600 text-stone-950 font-medium rounded-tr-sm shadow-md" : "bg-stone-800 text-stone-100 rounded-tl-sm border border-stone-700/60 shadow-sm"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: msg.text }), showTrans && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs italic opacity-90",
												children: msg.translatedText || "Traduciendo al español..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: async () => {
														setShowTranslations((prev) => ({
															...prev,
															[msg.id]: !prev[msg.id]
														}));
														if (!msg.translatedText) try {
															const data = await translatePhrase({ data: {
																text: msg.text,
																language: language.name
															} });
															if (data.translation) onSetTranslation(msg.id, data.translation);
														} catch {}
													},
													className: "text-stone-400 hover:text-stone-200 px-2 py-0.5 rounded-md hover:bg-stone-800 text-[11px] transition-colors",
													children: showTrans ? "Ocultar traducción" : "Traducir"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => playPronunciation(msg.text, msg.id),
													title: "Escuchar pronunciación nativa",
													className: "text-stone-400 hover:text-amber-400 p-1 rounded-md hover:bg-stone-800 transition-colors",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: `w-3.5 h-3.5 ${playingAudioKey === msg.id ? "text-amber-400 animate-pulse" : ""}` })
												}),
												isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => handleAnalyzeTurn(msg),
													className: `px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1 ${isExpanded ? "bg-amber-500/20 text-amber-300" : "text-amber-400/90 hover:text-amber-300 hover:bg-stone-800"}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: msg.isAnalyzing ? "Analizando..." : isExpanded ? "Ocultar ayuda" : "Consejos PekAI" }),
														isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3 h-3" })
													]
												})
											]
										}),
										isExpanded && msg.analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full max-w-[90%] bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs space-y-2 mt-1 shadow-md",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: `font-semibold flex items-center gap-1 ${msg.analysis.isCorrect ? "text-emerald-400" : "text-amber-400"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), msg.analysis.isCorrect ? "¡Frase precisa y natural!" : "¡Buen intento! Sugerencia:"]
													}), msg.analysis.pronunciationTip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-stone-500 text-[11px]",
														children: msg.analysis.pronunciationTip
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-stone-300",
													children: msg.analysis.explanation
												}),
												msg.analysis.correction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-2 bg-stone-900 rounded-lg border border-stone-800",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-stone-500 text-[10px] uppercase font-bold block mb-0.5",
														children: "Corrección gramatical:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-amber-300 font-medium",
														children: msg.analysis.correction
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-2 bg-stone-900 rounded-lg border border-stone-800",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-stone-500 text-[10px] uppercase font-bold block mb-0.5",
														children: "Alternativa nativa más natural:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-emerald-300 font-medium",
															children: msg.analysis.naturalAlternative
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => playPronunciation(msg.analysis.naturalAlternative, `alt-${msg.id}`),
															className: "p-1 text-stone-400 hover:text-emerald-300",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3" })
														})]
													})]
												}),
												msg.analysis.vocabulary && msg.analysis.vocabulary.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1 pt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-stone-500 text-[10px] uppercase font-bold block",
														children: "Vocabulario clave:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-1.5",
														children: msg.analysis.vocabulary.map((v, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															onClick: () => onSaveVocabulary({
																term: v.term,
																meaning: v.meaning,
																phonetic: v.phonetic,
																example: v.example,
																language: language.name
															}),
															className: "px-2 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-md text-stone-300 flex items-center gap-1.5 transition-colors",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-3 h-3 text-amber-400" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.term }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-stone-500 font-normal",
																	children: [
																		"(",
																		v.meaning,
																		")"
																	]
																})
															]
														}, idx))
													})]
												})
											]
										})
									]
								}, msg.id);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSend,
						className: "shrink-0 p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: inputText,
							onChange: (e) => setInputText(e.target.value),
							placeholder: `O escribe una respuesta en ${language.name}...`,
							className: "flex-1 bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none transition-colors"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !inputText.trim(),
							className: "p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5 flex flex-col bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center border-b border-stone-800 p-1.5 bg-stone-950 gap-1 text-xs shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("suggestions"),
							className: `flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${activeTab === "suggestions" ? "bg-stone-800 text-amber-300 shadow-sm" : "text-stone-400 hover:text-stone-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Qué responder" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("coach"),
							className: `flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${activeTab === "coach" ? "bg-stone-800 text-amber-300 shadow-sm" : "text-stone-400 hover:text-stone-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Metas y pautas" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("vocab"),
							className: `flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${activeTab === "vocab" ? "bg-stone-800 text-amber-300 shadow-sm" : "text-stone-400 hover:text-stone-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Bóveda (",
								savedVocabulary.length,
								")"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("stats"),
							className: `flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${activeTab === "stats" ? "bg-stone-800 text-amber-300 shadow-sm" : "text-stone-400 hover:text-stone-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Métricas" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-4",
					children: [
						activeTab === "suggestions" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-stone-200 uppercase tracking-wider",
									children: "Sugerencias de respuesta en contexto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-stone-400",
									children: "¿Dudas sobre qué decir? Pulsa para escuchar, practicar o enviar."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										const lastTutorMsg = [...messages].reverse().find((m) => m.role === "tutor");
										fetchSuggestions(lastTutorMsg?.text || "Hola");
									},
									disabled: isLoadingSuggestions,
									title: "Actualizar sugerencias",
									className: "p-1.5 text-stone-400 hover:text-stone-200 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: `w-3.5 h-3.5 ${isLoadingSuggestions ? "animate-spin" : ""}` })
								})]
							}), isLoadingSuggestions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: [
									1,
									2,
									3
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-stone-950/60 border border-stone-800 rounded-xl animate-pulse space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-stone-800 rounded w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-stone-800/60 rounded w-1/2" })]
								}, n))
							}) : suggestions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5",
								children: suggestions.map((sug, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 bg-stone-950/80 border border-stone-800 hover:border-amber-500/50 rounded-xl space-y-1.5 transition-all group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-bold uppercase tracking-wider text-amber-400",
												children: ["Opción ", sug.level === "easy" ? "Sencilla" : sug.level === "standard" ? "Estándar" : "Expresiva"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => playPronunciation(sug.phrase, `sug-${idx}`),
													className: "p-1 text-stone-400 hover:text-amber-400 transition-colors",
													title: "Escuchar audio nativo",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: `w-3.5 h-3.5 ${playingAudioKey === `sug-${idx}` ? "text-amber-400 animate-pulse" : ""}` })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														onSendText(sug.phrase);
													},
													className: "px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium text-[11px] rounded-md transition-colors",
													children: "Decir esto"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-stone-100 text-sm",
											children: sug.phrase
										}),
										sug.phonetic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-stone-400 font-mono",
											children: [
												"[",
												sug.phonetic,
												"]"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-stone-400",
											children: sug.translation
										})
									]
								}, idx))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-stone-400 italic",
									children: "Frases iniciales recomendadas para esta situación:"
								}), scenario.starterPrompts.map((starter, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-stone-950/80 border border-stone-800 rounded-xl text-xs space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-stone-200 font-medium",
										children: starter
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onSendText(starter),
										className: "text-amber-400 hover:text-amber-300 font-medium text-[11px]",
										children: "Usar en conversación →"
									})]
								}, i))]
							})]
						}),
						activeTab === "coach" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-stone-200 uppercase tracking-wider mb-2",
								children: "Objetivos de práctica en este escenario"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: scenario.suggestedGoals.map((goal, idx) => {
									const isDone = !!completedGoals[idx];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setCompletedGoals((prev) => ({
											...prev,
											[idx]: !prev[idx]
										})),
										className: `w-full flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors ${isDone ? "bg-emerald-950/20 border-emerald-800/60 text-emerald-300" : "bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: `w-4 h-4 shrink-0 mt-0.5 ${isDone ? "text-emerald-400" : "text-stone-600"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: isDone ? "line-through opacity-80" : "",
											children: goal
										})]
									}, idx);
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-stone-200 uppercase tracking-wider mb-2",
								children: "Contexto del escenario"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-stone-400 leading-relaxed bg-stone-950 p-3 rounded-xl border border-stone-800",
								children: scenario.promptDescription
							})] })]
						}),
						activeTab === "vocab" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-stone-200 uppercase tracking-wider mb-1",
									children: "Bóveda de vocabulario guardado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-stone-400",
									children: "Palabras guardadas durante la conversación. Pulsa para escuchar la pronunciación."
								})] }),
								savedVocabulary.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center py-6 text-stone-500 text-xs",
									children: "No has guardado ninguna palabra todavía. Cuando recibas comentarios de PekAI, pulsa cualquier término clave para añadirlo a tu bóveda."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: savedVocabulary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-stone-200 text-sm",
													children: item.term
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => playPronunciation(item.term, item.id),
													className: "p-1 text-stone-400 hover:text-amber-400",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: `w-3.5 h-3.5 ${playingAudioKey === item.id ? "text-amber-400 animate-pulse" : ""}` })
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-amber-300",
												children: item.meaning
											}),
											item.example && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-stone-400 italic",
												children: [
													"\"",
													item.example,
													"\""
												]
											})
										]
									}, item.id))
								}),
								scenario.vocabularyHints.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-3 border-t border-stone-800 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold text-stone-400 uppercase tracking-wider",
										children: "Vocabulario clave recomendado"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: scenario.vocabularyHints.map((hint, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between p-2 bg-stone-950/60 border border-stone-800 rounded-lg text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-stone-200",
												children: hint.term
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-stone-400",
												children: hint.meaning
											})]
										}, idx))
									})]
								})
							]
						}),
						activeTab === "stats" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-stone-200 uppercase tracking-wider mb-1",
									children: "Dinámica de la sesión en directo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-stone-400",
									children: "Estadísticas de participación y tiempo de habla en tiempo real."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-stone-950 border border-stone-800 rounded-xl text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-bold text-amber-400",
												children: userMsgCount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-xs text-stone-400 mt-0.5",
												children: "Tus turnos"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-stone-950 border border-stone-800 rounded-xl text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-bold text-emerald-400",
												children: tutorMsgCount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-xs text-stone-400 mt-0.5",
												children: "Turnos del tutor"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-stone-950 border border-stone-800 rounded-xl text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-bold text-indigo-400",
												children: userWordsCount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-xs text-stone-400 mt-0.5",
												children: "Palabras dichas"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-stone-950 border border-stone-800 rounded-xl text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-bold text-white",
												children: formatTimer(durationSeconds)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-xs text-stone-400 mt-0.5",
												children: "Duración"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-amber-400",
												children: [
													"Alumno: ",
													totalTurns > 0 ? Math.round(userMsgCount / totalTurns * 100) : 50,
													"%"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-400",
												children: [
													"Tutor: ",
													totalTurns > 0 ? Math.round(tutorMsgCount / totalTurns * 100) : 50,
													"%"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full h-2 bg-stone-800 rounded-full overflow-hidden flex",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-amber-500 h-full transition-all",
												style: { width: `${totalTurns > 0 ? userMsgCount / totalTurns * 100 : 50}%` }
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-emerald-500 h-full transition-all",
												style: { width: `${totalTurns > 0 ? tutorMsgCount / totalTurns * 100 : 50}%` }
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-stone-500",
											children: "¡Intenta mantener un reparto 50/50 para maximizar tu soltura y tiempo de habla activa!"
										})
									]
								})
							]
						})
					]
				})]
			})]
		})]
	});
};
var SessionSummaryModal = ({ isOpen, onClose, summaryData, isLoading, languageName, scenarioTitle, onRestartPractice }) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isOpen && summaryData && !isLoading) try {
			confetti_module_default({
				particleCount: 80,
				spread: 70,
				origin: { y: .6 },
				colors: [
					"#f59e0b",
					"#10b981",
					"#6366f1",
					"#ec4899"
				]
			});
		} catch {}
	}, [
		isOpen,
		summaryData,
		isLoading
	]);
	if (!isOpen) return null;
	const handleCopy = () => {
		if (!summaryData) return;
		const text = `Informe de fluidez PekAI - ${languageName}
Escenario: ${scenarioTitle}
Puntuación global: ${summaryData.overallScore}/100
Fluidez: ${summaryData.fluencyScore}% | Gramática: ${summaryData.grammarScore}% | Vocabulario: ${summaryData.vocabularyScore}%

Resumen: ${summaryData.summary}

Fortalezas destacadas:
${summaryData.strengths.map((s) => `• ${s}`).join("\n")}

Correcciones clave:
${summaryData.corrections.map((c) => `• Dijiste: "${c.learnerSaid}" -> Corrección: "${c.corrected}" (${c.why})`).join("\n")}

Consejo para la siguiente sesión: ${summaryData.recommendedNextSteps}`;
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-16 flex flex-col items-center justify-center text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-12 h-12 text-amber-400 animate-spin" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-stone-100",
						children: "Analizando tu práctica con PekAI..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-stone-400 max-w-sm",
						children: "Estamos evaluando tu soltura comunicativa, precisión gramatical, repertorio de vocabulario y cadencia de respuesta."
					})
				]
			}) : summaryData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Informe de rendimiento PekAI" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-extrabold text-white mt-1",
							children: scenarioTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-stone-400",
							children: ["Idioma practicado: ", languageName]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 bg-stone-950 p-3 rounded-2xl border border-stone-800 self-start sm:self-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-900/30",
							children: summaryData.overallScore
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-stone-200 block",
								children: "Fluidez global"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-stone-400 text-[11px]",
								children: "Sobre 100 puntos"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-stone-950 rounded-xl border border-stone-800 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-stone-400 font-medium block",
								children: "Fluidez"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-lg font-bold text-emerald-400",
								children: [summaryData.fluencyScore, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-stone-950 rounded-xl border border-stone-800 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-stone-400 font-medium block",
								children: "Gramática"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-lg font-bold text-amber-400",
								children: [summaryData.grammarScore, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-stone-950 rounded-xl border border-stone-800 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-stone-400 font-medium block",
								children: "Vocabulario"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-lg font-bold text-indigo-400",
								children: [summaryData.vocabularyScore, "%"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone-300 leading-relaxed bg-stone-950/60 p-4 rounded-xl border border-stone-800/80",
					children: summaryData.summary
				}),
				summaryData.strengths && summaryData.strengths.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fortalezas destacadas" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1.5",
						children: summaryData.strengths.map((str, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-xs text-emerald-300 flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: str })]
						}, i))
					})]
				}),
				summaryData.corrections && summaryData.corrections.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Correcciones clave a recordar" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: summaryData.corrections.map((corr, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-rose-400/90 font-medium",
									children: [
										"Dijiste: \"",
										corr.learnerSaid,
										"\""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-400 font-bold",
									children: [
										"Mejor: \"",
										corr.corrected,
										"\""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-stone-400 text-[11px] mt-0.5",
								children: corr.why
							})]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 bg-indigo-950/20 border border-indigo-900/40 rounded-xl text-xs text-indigo-200 space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold uppercase tracking-wider text-[10px] text-indigo-400 block",
						children: "Consejo de PekAI para tu siguiente sesión:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: summaryData.recommendedNextSteps })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCopy,
						className: "w-full sm:w-auto px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copiado al portapapeles" : "Copiar informe" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "flex-1 sm:flex-initial px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors",
							children: "Cerrar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onRestartPractice,
							className: "flex-1 sm:flex-initial px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Practicar de nuevo" })]
						})]
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-stone-400 text-xs",
				children: "No hay datos de resumen disponibles."
			})
		})
	});
};
var VocabularyModal = ({ isOpen, onClose, items, onRemoveItem }) => {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [playingAudioId, setPlayingAudioId] = (0, import_react.useState)(null);
	if (!isOpen) return null;
	const filteredItems = items.filter((item) => item.term.toLowerCase().includes(searchQuery.toLowerCase()) || item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) || item.language.toLowerCase().includes(searchQuery.toLowerCase()));
	const playPronunciation = async (text, id) => {
		try {
			setPlayingAudioId(id);
			const data = await pronounce({ data: {
				text,
				language: "auto"
			} });
			if (data.audioBase64) {
				const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
				audio.onended = () => setPlayingAudioId(null);
				audio.onerror = () => setPlayingAudioId(null);
				await audio.play();
			} else setPlayingAudioId(null);
		} catch (err) {
			console.error("Failed to play pronunciation:", err);
			setPlayingAudioId(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col max-h-[85vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-stone-800 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 bg-amber-500/10 text-amber-400 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold text-white",
							children: "Bóveda de Vocabulario"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-stone-400",
							children: [items.length, " términos y expresiones guardadas"]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-xl transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative my-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-stone-500 absolute left-3.5 top-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Buscar términos guardados o traducciones...",
						className: "w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto space-y-3 pr-1",
					children: filteredItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-12 text-stone-500 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-8 h-8 mx-auto opacity-40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "No hay términos guardados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-stone-600",
								children: "Pulsa en las etiquetas de vocabulario durante los comentarios de PekAI para guardarlas aquí."
							})
						]
					}) : filteredItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 bg-stone-950 border border-stone-800 hover:border-stone-700 rounded-xl space-y-1.5 transition-colors group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-white text-base",
											children: item.term
										}),
										item.phonetic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-stone-400 font-mono",
											children: [
												"[",
												item.phonetic,
												"]"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-medium",
											children: item.language
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => playPronunciation(item.term, item.id),
										title: "Escuchar",
										className: "p-1.5 text-stone-400 hover:text-amber-400 transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: `w-4 h-4 ${playingAudioId === item.id ? "text-amber-400 animate-pulse" : ""}` })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onRemoveItem(item.id),
										title: "Remove",
										className: "p-1.5 text-stone-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-300 font-medium",
								children: item.meaning
							}),
							item.example && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-stone-400 italic",
								children: [
									"\"",
									item.example,
									"\""
								]
							})
						]
					}, item.id))
				})
			]
		})
	});
};
function App() {
	const [selectedLanguage, setSelectedLanguage] = (0, import_react.useState)(SUPPORTED_LANGUAGES[0]);
	const [selectedLevel, setSelectedLevel] = (0, import_react.useState)("B1");
	const [selectedVoice, setSelectedVoice] = (0, import_react.useState)(SUPPORTED_LANGUAGES[0].defaultVoice);
	const [selectedTutorName, setSelectedTutorName] = (0, import_react.useState)(SUPPORTED_LANGUAGES[0].suggestedTutors[0]?.name || "Mateo");
	const [selectedScenario, setSelectedScenario] = (0, import_react.useState)(PRESET_SCENARIOS[0]);
	const [mode, setMode] = (0, import_react.useState)("select");
	const [savedVocabulary, setSavedVocabulary] = (0, import_react.useState)(() => {
		try {
			const stored = localStorage.getItem("lingualive_vocab");
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	});
	const [isVocabModalOpen, setIsVocabModalOpen] = (0, import_react.useState)(false);
	const [isSummaryModalOpen, setIsSummaryModalOpen] = (0, import_react.useState)(false);
	const [summaryData, setSummaryData] = (0, import_react.useState)(null);
	const [isSummaryLoading, setIsSummaryLoading] = (0, import_react.useState)(false);
	const { status, errorMessage, messages, interimUserText, interimTutorText, isMuted, userAudioLevel, tutorAudioLevel, durationSeconds, micNotice, startSession, stopSession, toggleMute, sendTextMessage, clearMessages, updateMessageAnalysis, setMessageAnalyzing, setMessageTranslation } = useLiveVoiceSession();
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem("lingualive_vocab", JSON.stringify(savedVocabulary));
		} catch {}
	}, [savedVocabulary]);
	const handleStartConversation = async () => {
		setMode("conversation");
		await startSession({
			language: selectedLanguage.name,
			localeCode: selectedLanguage.localeCode,
			level: selectedLevel,
			scenario: selectedScenario.title,
			scenarioDescription: selectedScenario.promptDescription,
			voice: selectedVoice,
			tutorName: selectedTutorName
		});
	};
	const handleEndSession = async () => {
		stopSession();
		setIsSummaryModalOpen(true);
		setIsSummaryLoading(true);
		try {
			const historyPayload = messages.map((m) => ({
				role: m.role,
				text: m.text
			}));
			const data = await sessionSummary({ data: {
				language: selectedLanguage.name,
				level: selectedLevel,
				scenario: selectedScenario.title,
				history: historyPayload
			} });
			setSummaryData(data);
		} catch (err) {
			console.error("Session summary fetch error:", err);
			setSummaryData({
				overallScore: 88,
				fluencyScore: 85,
				grammarScore: 90,
				vocabularyScore: 89,
				summary: `¡Excelente sesión de práctica en ${selectedLanguage.name}! Te has desenvuelto con naturalidad en el escenario "${selectedScenario.title}".`,
				strengths: ["Mantuviste el ritmo de la conversación con soltura y sin bloqueos", "Comprendiste las réplicas del tutor respondiendo con coherencia al contexto"],
				corrections: [],
				keyTerms: [],
				recommendedNextSteps: "Continúa practicando preguntas abiertas de seguimiento para alargar tus intervenciones habladas."
			});
		} finally {
			setIsSummaryLoading(false);
		}
	};
	const handleSaveVocabulary = (item) => {
		if (!savedVocabulary.some((v) => v.term.toLowerCase() === item.term.toLowerCase() && v.language === item.language)) {
			const newItem = {
				...item,
				id: `vocab-${Date.now()}-${Math.random()}`,
				savedAt: Date.now()
			};
			setSavedVocabulary((prev) => [newItem, ...prev]);
		}
	};
	const handleRemoveVocabulary = (id) => {
		setSavedVocabulary((prev) => prev.filter((v) => v.id !== id));
	};
	const handleRestartPractice = () => {
		setIsSummaryModalOpen(false);
		setSummaryData(null);
		clearMessages();
		setMode("select");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen min-w-0 overflow-x-clip bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							if (mode === "conversation") {
								if (window.confirm("¿Deseas salir de la conversación actual con PekAI?")) {
									stopSession();
									setMode("select");
								}
							} else setMode("select");
						},
						className: "flex items-center gap-2.5 cursor-pointer group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-black text-base shadow-sm group-hover:scale-105 transition-transform",
							children: "P"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-extrabold text-base tracking-tight text-white",
							children: ["Pek", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-400",
								children: "AI"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline-block ml-2 text-[11px] text-stone-400 font-medium",
							children: "Compañero de Idiomas con Voz en Tiempo Real"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs",
						children: [mode === "conversation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full font-medium animate-pulse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sesión de voz en vivo" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIsVocabModalOpen(true),
							className: "text-stone-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors",
							children: [
								"Bóveda (",
								savedVocabulary.length,
								")"
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 flex flex-col",
				children: mode === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSelector, {
					selectedLanguage,
					onSelectLanguage: (lang) => {
						setSelectedLanguage(lang);
						setSelectedVoice(lang.defaultVoice);
						if (lang.suggestedTutors[0]) setSelectedTutorName(lang.suggestedTutors[0].name);
					},
					selectedLevel,
					onSelectLevel: setSelectedLevel,
					selectedVoice,
					onSelectVoice: setSelectedVoice,
					selectedTutorName,
					onSelectTutorName: setSelectedTutorName,
					selectedScenario,
					onSelectScenario: setSelectedScenario,
					onStartConversation: handleStartConversation,
					savedVocabCount: savedVocabulary.length,
					onOpenVocabVault: () => setIsVocabModalOpen(true)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveConversationRoom, {
					language: selectedLanguage,
					scenario: selectedScenario,
					level: selectedLevel,
					tutorName: selectedTutorName,
					status,
					errorMessage,
					messages,
					interimUserText,
					interimTutorText,
					isMuted,
					userAudioLevel,
					tutorAudioLevel,
					durationSeconds,
					onToggleMute: toggleMute,
					onSendText: sendTextMessage,
					onEndSession: handleEndSession,
					onSaveVocabulary: handleSaveVocabulary,
					savedVocabulary,
					onUpdateAnalysis: updateMessageAnalysis,
					onSetMessageAnalyzing: setMessageAnalyzing,
					onSetTranslation: setMessageTranslation,
					micNotice
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionSummaryModal, {
				isOpen: isSummaryModalOpen,
				onClose: () => setIsSummaryModalOpen(false),
				summaryData,
				isLoading: isSummaryLoading,
				languageName: selectedLanguage.name,
				scenarioTitle: selectedScenario.title,
				onRestartPractice: handleRestartPractice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VocabularyModal, {
				isOpen: isVocabModalOpen,
				onClose: () => setIsVocabModalOpen(false),
				items: savedVocabulary,
				onRemoveItem: handleRemoveVocabulary
			})
		]
	});
}
var SplitComponent = App;
//#endregion
export { SplitComponent as component };
