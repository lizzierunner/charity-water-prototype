// ===============================
// Global Event Delegation & Listeners
// ===============================

// Click event delegation
document.addEventListener('click', function (e) {
	const actionBtn = e.target.closest('[data-action]');
	if (actionBtn) {
		const action = actionBtn.getAttribute('data-action');
		switch (action) {
			case 'start-mission': startMission(); break;
			case 'back': window.history.back(); break;
			case 'next': /* handle next step */ break;
			case 'back-edit': navigateToScreen('name-input'); break;
			case 'continue-quiz': continueFromImpact(); break;
			case 'donate': /* open donation modal or link */ break;
			case 'play-again': playAgain(); break;
			case 'share-twitter': /* share logic */ break;
			case 'share-facebook': /* share logic */ break;
			case 'copy-link': /* copy link logic */ break;
			default: break;
		}
		e.preventDefault();
		return;
	}
	// Avatar selection
	const avatarCard = e.target.closest('.avatar-card[data-avatar]');
	if (avatarCard) {
		selectAvatar(avatarCard.getAttribute('data-avatar'));
		document.querySelectorAll('.avatar-card').forEach(card => card.classList.remove('selected'));
		avatarCard.classList.add('selected');
		// Enable next button
		const nextBtn = document.querySelector('#avatar-selection .next-btn');
		if (nextBtn) nextBtn.disabled = false;
		e.preventDefault();
		return;
	}
	// Answer selection
	const answerBtn = e.target.closest('.answer-btn, .answer-button');
	if (answerBtn && !answerBtn.disabled) {
		answerQuestion(answerBtn.getAttribute('data-answer'));
		e.preventDefault();
		return;
	}
});

// Input event delegation
document.addEventListener('input', function (e) {
	if (e.target.matches('#hero-name-input')) {
		const value = e.target.value;
		// Character count
		const counter = document.getElementById('char-counter');
		if (counter) counter.textContent = `${value.length}/20`;
		// Validation
		const error = document.getElementById('name-error');
		if (error) {
			if (value.length === 0) {
				error.textContent = '';
				error.style.display = 'none';
			} else if (!/^[\w\s'-]{2,20}$/.test(value)) {
				error.textContent = 'Please enter a valid hero name (2-20 characters).';
				error.style.display = 'block';
			} else {
				error.textContent = '';
				error.style.display = 'none';
			}
		}
		// Enable next button if valid
		const nextBtn = document.querySelector('#name-input .next-btn');
		if (nextBtn) nextBtn.disabled = !(value.length >= 2 && value.length <= 20);
		// Real-time name suggestions (optional: implement suggestion logic)
	}
});

// Form submit handlers
document.addEventListener('submit', function (e) {
	e.preventDefault();
});

// Keyboard event listeners
document.addEventListener('keydown', function (e) {
/**
 * Konami code Easter egg
 * Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
 * Triggers mega celebration
 */
const KONAMI_CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', function (e) {
	if (e.key.toLowerCase() === KONAMI_CODE[konamiIndex].toLowerCase()) {
		konamiIndex++;
		if (konamiIndex === KONAMI_CODE.length) {
			konamiIndex = 0;
			// Trigger mega celebration
			if (typeof triggerLegendaryCelebration === 'function') {
				triggerLegendaryCelebration();
			} else if (typeof startConfetti === 'function') {
				startConfetti('extreme');
				alert('Konami code unlocked! Mega celebration!');
			}
		}
	} else {
		konamiIndex = 0;
	}
});
	/**
	 * Keyboard shortcut Easter eggs
	 * Escape: Reset quiz (with confirmation)
	 * 1-4: Select answer
	 * Enter: Submit name or answer
	 * C: Trigger confetti (results page only)
	 */
	const activeScreen = AppState.currentScreen;
	if (activeScreen === 'name-input' && e.key === 'Enter') {
		const input = document.getElementById('hero-name-input');
		if (input && input.value.length >= 2 && input.value.length <= 20) {
			enterName(input.value);
		}
	}
	if (e.key === 'Escape') {
		// Confirm before resetting quiz
		if (confirm('Reset your progress and return to the start?')) {
			playAgain();
		}
	}
	if (activeScreen === 'results-page' && (e.key === 'c' || e.key === 'C')) {
		// Easter egg: trigger confetti on results page
		if (typeof startConfetti === 'function') startConfetti('extreme');
	}
	// Arrow keys for answer navigation
	if (activeScreen === 'quiz-screen') {
		const answers = Array.from(document.querySelectorAll('.answer-btn, .answer-button'));
		let idx = answers.findIndex(btn => btn === document.activeElement);
		if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			if (idx < answers.length - 1) answers[idx + 1].focus();
			e.preventDefault();
		} else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			if (idx > 0) answers[idx - 1].focus();
			e.preventDefault();
		}
		// Number keys 1-4 for answer selection
		if (/^[1-4]$/.test(e.key)) {
			const btn = answers[parseInt(e.key, 10) - 1];
			if (btn) btn.click();
		}
		// Enter to submit selected answer
		if (e.key === 'Enter') {
			const selected = answers.find(btn => btn.classList.contains('selected'));
			if (selected) selected.click();
		}
	}
});

// Window event listeners
window.addEventListener('resize', () => {
	// Adjust layouts if needed
});
window.addEventListener('load', () => {
	// App already initialized in DOMContentLoaded
});
window.addEventListener('hashchange', () => {
	// Already handled in routing
});

// Custom events
function dispatchCustomEvent(name, detail = {}) {
	document.dispatchEvent(new CustomEvent(name, { detail }));
}

// Example: dispatchCustomEvent('screenChanged', { screen: AppState.currentScreen });
// Listen for custom events as needed:
// document.addEventListener('screenChanged', e => { ... });
// ===============================
// Screen Routing System
// ===============================

function navigateToScreen(screenName, animated = true) {
	const screen = document.getElementById(screenName);
	if (!screen) return;
	StateManager.saveState();
	if (animated) {
		// Optionally show a transition overlay or animation
		transitionScreen(screenName, true);
	} else {
		showScreen(screenName);
	}
	window.location.hash = `#${screenName}`;
	window.scrollTo({ top: 0, behavior: 'smooth' });
	initializeScreen(screenName);
}

function initializeScreen(screenName) {
	// Call screen-specific init functions, set up listeners, populate data, start animations
	const initFn = screenInitializers[screenName];
	if (typeof initFn === 'function') {
		initFn();
	}
}

// Screen-specific initialization registry
const screenInitializers = {
	'landing-page': initLandingPage,
	'avatar-selection': initAvatarSelection,
	'name-input': initNameInput,
	'character-confirmation': initCharacterConfirmation,
	'quiz-screen': initQuizScreen,
	'impact-story': initImpactStory,
	'results-page': initResultsPage,
};

// Placeholder init functions (to be implemented in each screen's JS file)
function initLandingPage() {}
function initAvatarSelection() {}
function initNameInput() {}
function initCharacterConfirmation() {}
function initQuizScreen() {}
function initImpactStory() {}
function initResultsPage() {}

// Navigation methods for each transition
function startMission() {
	navigateToScreen('avatar-selection');
}
function selectAvatar(avatar) {
	StateManager.updateState({ selectedAvatar: avatar });
	// Enable next button, update UI as needed
}
function confirmAvatar() {
	navigateToScreen('name-input');
}
function enterName(name) {
	StateManager.updateState({ heroName: name });
	navigateToScreen('character-confirmation');
}
function confirmCharacter() {
	navigateToScreen('quiz-screen');
}
function answerQuestion(answer) {
	// Process answer, update state, show feedback, then:
	// If impact story, go to impact-story, else next question or results
	// Example:
	// if (shouldShowImpactStory()) navigateToScreen('impact-story');
	// else if (isQuizComplete()) finishQuiz();
	// else nextQuestion();
}
function continueFromImpact() {
	// Go to next question or results
	// Example: navigateToScreen('quiz-screen');
}
function finishQuiz() {
	navigateToScreen('results-page');
}
function playAgain() {
	StateManager.resetState();
	navigateToScreen('landing-page');
}

// Hash-based routing for deep links and browser navigation
window.addEventListener('hashchange', () => {
	const screenName = window.location.hash.replace('#', '') || 'landing-page';
	navigateToScreen(screenName, false);
});


// ===============================
// App Initialization
// ===============================

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
	// Load quiz questions, avatars, impact stories
	window.quizQuestions = window.quizQuestions || (typeof loadQuizQuestions === 'function' ? loadQuizQuestions() : []);
	window.avatars = window.avatars || (typeof loadAvatars === 'function' ? loadAvatars() : []);
	window.impactStories = window.impactStories || (typeof loadImpactStories === 'function' ? loadImpactStories() : []);

	// Initialize state
	StateManager.loadState();

	// Set up event listeners (already handled by global delegation)

	// Show initial screen (landing or resume)
	const screenName = window.location.hash.replace('#', '') || 'landing-page';
	navigateToScreen(screenName, false);

	// Preload assets (images, sounds, etc.)
	preloadAssets();

	// Initialize animations (if needed)
	if (typeof initAnimations === 'function') initAnimations();

	// Log welcome message
	logWelcomeMessage();

	// Check browser compatibility
	checkBrowserCompatibility();

	// Set up error handlers
	window.onerror = function (msg, url, line, col, error) {
		console.error('H2O Hero App Error:', msg, url, line, col, error);
		// Optionally show user-friendly error UI
	};
	window.onunhandledrejection = function (e) {
		console.error('H2O Hero Unhandled Promise:', e.reason);
	};
}

function preloadAssets() {
	// Example: preload images
	const images = [
		'assets/images/hero-bg.jpg',
		'assets/images/avatars.png',
		// Add more as needed
	];
	images.forEach(src => {
		const img = new Image();
		img.src = src;
	});
}

function logWelcomeMessage() {
	/**
	 * Console Easter Eggs
	 * - ASCII art H2O Hero logo
	 * - Welcome message
	 * - Keyboard shortcuts info
	 * - Hidden cheat codes info
	 * - charity: water mission statement
	 */
	const logo = `\n%c _   _  ___   ___    _   _                 \n%c| | | |/ _ \\ / _ \\  | | | |                \n%c| |_| | | | | | | | | | | | |__  _   _  ___  \n%c|  _  | | | | | | | | | | | '_ \\| | | |/ _ \\ \n%c| | | | |_| | |_| | | |_| | |_) | |_| |  __/ \n%c\\_| |_/\\___/ \\___/   \\___/|_.__/ \\__, |\\___| \n%c                                   __/ |     \n%c                                  |___/      \n`;
	const version = 'v1.0.0';
	const brand = 'charity: water';
	const info = 'Keyboard: \u2190 \u2192 \u2191 \u2193, 1-4 = answer, Esc = reset, Enter = next, C = confetti';
	console.log(
		logo,
		'color:#1A5F7A;font-weight:bold;',
		'color:#57C5B6;font-weight:bold;',
		'color:#FF6B35;font-weight:bold;',
		'color:#FFC72C;font-weight:bold;',
		'color:#4FC3F7;font-weight:bold;',
		'color:#333;font-weight:bold;',
		'color:#FFC72C;font-weight:bold;',
		'color:#57C5B6;font-weight:bold;'
	);
	console.log(`%cH2O Hero Quiz %c${version}  %cPowered by %c${brand}`,
		'color:#1A5F7A;font-weight:bold;',
		'color:#FF6B35;font-weight:bold;',
		'color:#333;font-weight:bold;',
		'color:#FFC72C;font-weight:bold;'
	);
	console.log(`%c${info}`, 'color:#57C5B6;font-weight:bold;');
	console.log('%cFound the console! You\'re a true hero \uD83D\uDCA7', 'color:#FFC72C;font-size:16px;font-weight:bold;');
	console.log('%cType "cheat" for hidden codes. Mission: Bring clean water to everyone on the planet.', 'color:#1A5F7A;font-size:14px;');
	console.log('%ccharity: water: "We\'re on a mission to solve the water crisis in our lifetime."', 'color:#57C5B6;font-size:13px;');
	// Detect console opening (simple)
	if (window) {
		setTimeout(() => {
			if (window.console && window.console.log) {
				console.log('%cPssst... Try the Konami code for a surprise!', 'color:#FF6B35;font-size:14px;');
			}
		}, 2000);
	}
}

function checkBrowserCompatibility() {
	// Feature detection
	if (!window.localStorage || !window.addEventListener || !document.querySelector) {
		alert('Your browser is not fully supported. Please update to a modern browser for the best experience.');
	}
	// Fallbacks for older browsers can be added here
}

// ===============================
// App State Management
// ===============================

const AppState = {
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
};

const initialState = { ...AppState };

const StateManager = {
	updateState(updates) {
		Object.assign(AppState, updates);
		this.saveState();
	},
	resetState() {
		Object.assign(AppState, { ...initialState });
		this.saveState();
	},
	saveState() {
		try {
			localStorage.setItem('h2oHeroAppState', JSON.stringify(AppState));
		} catch (e) {
			// Fallback: ignore if storage is unavailable
		}
	},
	loadState() {
		try {
			const saved = localStorage.getItem('h2oHeroAppState');
			if (saved) {
				Object.assign(AppState, JSON.parse(saved));
			}
		} catch (e) {
			// Ignore load errors
		}
	},
	getState(key) {
		return AppState[key];
	},
};

// ===============================
// Screen Navigation
// ===============================

function showScreen(screenName) {
	const screens = document.querySelectorAll('.screen');
	screens.forEach(s => s.hidden = true);
	const target = document.getElementById(`${screenName}`);
	if (target) target.hidden = false;
	AppState.currentScreen = screenName;
}

function transitionScreen(screenName, withAnimation = true) {
	const current = document.getElementById(AppState.currentScreen);
	const next = document.getElementById(screenName);
	if (!next) return;
	if (withAnimation && current) {
		current.classList.add('animate-fade-out');
		current.addEventListener('animationend', () => {
			current.hidden = true;
			current.classList.remove('animate-fade-out');
			next.hidden = false;
			next.classList.add('animate-fade-in');
			setTimeout(() => next.classList.remove('animate-fade-in'), 600);
			AppState.currentScreen = screenName;
		}, { once: true });
	} else {
		showScreen(screenName);
	}
}

function getCurrentScreen() {
	return AppState.currentScreen;
}
