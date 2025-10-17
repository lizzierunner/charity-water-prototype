// State management for H2O Hero Quiz

const LOCAL_STORAGE_KEY = 'h2o-hero-quiz-state';
const STATE_VERSION = 1;

const initialState = {
	currentScreen: 'landing',
	selectedAvatar: null,
	heroName: '',
	currentQuestionIndex: 0,
	score: 0,
	xp: 0,
	questionsAnswered: 0,
	streak: 0,
	maxStreak: 0,
	lives: 3,
	comboMultiplier: 1,
	lastAnswerCorrect: null,
	answers: [],
	startTime: null,
	endTime: null,
	_version: STATE_VERSION
};

let state = { ...initialState };
let subscribers = [];

export function get(key) {
	return state[key];
}

export function set(key, value) {
	state[key] = value;
	notify();
}

export function update(obj) {
	Object.assign(state, obj);
	notify();
}

export function reset() {
	state = { ...initialState };
	notify();
}

export function save() {
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
	} catch (e) {}
}

export function load() {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!raw) return false;
		const loaded = JSON.parse(raw);
		if (!validateState(loaded)) return false;
		migrateState(loaded);
		state = { ...initialState, ...loaded };
		notify();
		return true;
	} catch (e) { return false; }
}

function validateState(obj) {
	if (!obj || typeof obj !== 'object') return false;
	// Basic validation: must have currentScreen, _version
	return 'currentScreen' in obj && '_version' in obj;
}

function migrateState(obj) {
	// Migration logic for future versions
	if (obj._version !== STATE_VERSION) {
		// Example: add new keys if missing
		Object.keys(initialState).forEach(k => {
			if (!(k in obj)) obj[k] = initialState[k];
		});
		obj._version = STATE_VERSION;
	}
}

export function subscribe(callback) {
	if (typeof callback === 'function') subscribers.push(callback);
}

export function notify() {
	subscribers.forEach(fn => fn(state));
}
// State Manager utility
