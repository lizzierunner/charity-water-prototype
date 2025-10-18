// ===============================
// Answer Processing Logic
// ===============================
export function handleAnswerClick(answerIndex) {
	const grid = document.querySelector('#quiz-screen .answer-grid');
	if (!grid) return;
	const buttons = Array.from(grid.querySelectorAll('.answer-btn, .answer-button'));
	buttons.forEach(btn => btn.disabled = true);
	const clicked = buttons[answerIndex];
	if (clicked) clicked.classList.add('selected');
	const idx = AppState.currentQuestionIndex || 0;
	const questionData = quizQuestions[idx];
	const isCorrect = (answerIndex === questionData.correctIndex);
	const isChallenge = !!questionData.challenge;
	// XP calculation
	const xpEarned = calculateXP(isCorrect, isChallenge, AppState.streak);
	// Streak/Combo logic
	let streak = isCorrect ? AppState.streak + 1 : 0;
	let maxStreak = Math.max(AppState.maxStreak || 0, streak);
	let lives = AppState.lives;
	if (!isCorrect) lives = Math.max(0, lives - 1);
	const comboMultiplier = updateComboMultiplier(streak);
	// Feedback
	showFeedbackAnimation(isCorrect);
	// Update state
	StateManager.updateState({
		score: (AppState.score || 0) + (isCorrect ? 1 : 0),
		xp: (AppState.xp || 0) + xpEarned,
		streak,
		maxStreak,
		lives,
		comboMultiplier,
		lastAnswerCorrect: isCorrect,
		questionsAnswered: (AppState.questionsAnswered || 0) + 1,
		answers: [...(AppState.answers || []), { idx, answerIndex, isCorrect, isChallenge, xpEarned }],
	});
	// Animate correct/incorrect
	if (clicked) clicked.classList.add(isCorrect ? 'correct' : 'incorrect');
	setTimeout(() => {
		proceedToNext();
	}, 1500);
}

export function showFeedbackAnimation(isCorrect) {
	const overlay = document.getElementById('quiz-feedback-overlay');
	if (!overlay) return;
	overlay.innerHTML = isCorrect ? '✅💧' : '❌💔';
	overlay.className = 'feedback-overlay ' + (isCorrect ? 'animate-scale-in' : 'animate-shake');
	setTimeout(() => {
		overlay.innerHTML = '';
		overlay.className = 'feedback-overlay';
	}, 1000);
}

export function calculateXP(isCorrect, isChallenge, currentStreak) {
	let base = isChallenge ? 100 : 50;
	let multiplier = updateComboMultiplier(currentStreak);
	let streakBonus = Math.floor(currentStreak / 3) * 25;
	let penalty = (!isCorrect && isChallenge) ? 20 : 0;
	let total = isCorrect ? (base * multiplier + streakBonus) : (isChallenge ? -penalty : 0);
	return total;
}

export function updateComboMultiplier(streak) {
	if (streak >= 6) return 4;
	if (streak >= 4) return 3;
	if (streak >= 2) return 2;
	return 1;
}

export function proceedToNext() {
	let idx = (AppState.currentQuestionIndex || 0) + 1;
	if (idx % 3 === 0 && idx < quizQuestions.length) {
		StateManager.updateState({ currentQuestionIndex: idx });
		navigateToScreen('impact-story');
	} else if (idx < quizQuestions.length) {
		StateManager.updateState({ currentQuestionIndex: idx });
		initQuizScreen();
	} else {
		finishQuiz();
	}
}

// ===============================
// UI Update Functions
// ===============================
export function updateSidebar() {
	// Update avatar, name, level, XP bar, lives, streak, combo, progress
}

export function updateProgressBar(idx, total) {
	const bar = document.getElementById('quiz-progress-bar');
	if (bar) bar.style.width = `${((idx + 1) / total) * 100}%`;
	const text = document.getElementById('quiz-question-progress');
	if (text) text.textContent = `${idx + 1}/${total}`;
}

export function renderLives() {
	const livesDisplay = document.querySelector('.lives-display');
	if (!livesDisplay) return;
	livesDisplay.innerHTML = '';
	for (let i = 0; i < 3; i++) {
		const span = document.createElement('span');
		span.className = 'life' + (i < (AppState.lives || 0) ? '' : ' lost');
		span.textContent = '💧';
		livesDisplay.appendChild(span);
	}
}

export function renderStreakBadge() {
	const badge = document.querySelector('.streak-badge');
	if (!badge) return;
	if ((AppState.streak || 0) > 0) {
		badge.style.display = '';
		badge.innerHTML = `<span class="flame">🔥</span> ${AppState.streak}`;
		badge.classList.add('animate-pulse');
	} else {
		badge.style.display = 'none';
	}
}

export function renderComboBadge() {
	const badge = document.querySelector('.combo-badge');
	if (!badge) return;
	if ((AppState.comboMultiplier || 1) > 1) {
		badge.style.display = '';
		badge.innerHTML = `<span class="lightning">⚡</span> x${AppState.comboMultiplier}`;
		badge.classList.add('animate-pulse');
	} else {
		badge.style.display = 'none';
	}
}

export function highlightChallengeQuestion() {
	const card = document.querySelector('.question-card');
	if (card) {
		card.classList.add('challenge', 'animate-pulse');
	}
	showChallengeBadge();
}

// ===============================
// Import quiz questions from data
// ===============================
import { quizQuestions } from '../data/quiz-questions.js';

// ===============================
// Quiz Screen Logic
// ===============================
export function initQuizScreen() {
	const idx = AppState.currentQuestionIndex || 0;
	const questionData = quizQuestions[idx];
	if (!questionData) return;
	renderSidebar();
	renderMobileHeader();
	renderQuestion(questionData);
	renderAnswers(questionData.answers);
	updateProgressBar(idx, quizQuestions.length);
	updateLivesStreakCombo();
	if (questionData.challenge) showChallengeBadge();
	setupAnswerHandlers();
	setupQuizKeyboardHandlers();
}

function renderSidebar() {
	// Render character info, lives, streak, combo, progress (desktop)
	// Implementation depends on your sidebar markup
}

function renderMobileHeader() {
	// Render compact character info, lives, progress (mobile)
	// Implementation depends on your mobile header markup
}

export function renderQuestion(questionData) {
	const qText = document.getElementById('quiz-question-text');
	if (qText) {
		qText.textContent = questionData.text;
		// Emoji decorations
		const deco = document.querySelector('#quiz-screen .question-decorations');
		if (deco) deco.innerHTML = '💧💧';
		// Animate in
		qText.classList.add('animate-fade-in', 'animate-slide-up');
		setTimeout(() => qText.classList.remove('animate-fade-in', 'animate-slide-up'), 700);
	}
	// Challenge badge
	if (questionData.challenge) showChallengeBadge();
	else hideChallengeBadge();
}

export function renderAnswers(answers) {
	const grid = document.querySelector('#quiz-screen .answer-grid');
	if (!grid) return;
	grid.innerHTML = '';
	// Optionally randomize order
	const shuffled = answers.slice().sort(() => Math.random() - 0.5);
	shuffled.forEach((ans, i) => {
		const btn = document.createElement('button');
		btn.className = 'answer-btn answer-button';
		btn.setAttribute('data-answer', i);
		btn.textContent = ans;
		btn.tabIndex = 0;
		setTimeout(() => btn.classList.add('animate-scale-in', 'animate-fade-in'), 100 + i * 100);
		grid.appendChild(btn);
	});
}


function updateLivesStreakCombo() {
	// Update lives, streak, combo UI
}

function showChallengeBadge() {
	const badge = document.getElementById('challenge-indicator');
	if (badge) badge.style.display = '';
}
function hideChallengeBadge() {
	const badge = document.getElementById('challenge-indicator');
	if (badge) badge.style.display = 'none';
}

function setupAnswerHandlers() {
	// Handled by global event delegation, but can add per-button logic if needed
}

function setupQuizKeyboardHandlers() {
	// Handled by global event delegation, but can add per-screen logic if needed
}
