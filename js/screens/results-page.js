// ===============================
// Enhanced Trophy Card
// ===============================
export function renderTrophyCard(rankData, percentage) {
	const trophyEl = document.getElementById('results-trophy');
	const rankTitle = document.getElementById('results-rank-title');
	const percentEl = document.getElementById('results-percentage');
	const messageEl = document.getElementById('results-congrats');
	const emojiEl = document.getElementById('results-celebration-emoji');
	const card = document.querySelector('.trophy-ranking-card');
	if (trophyEl) {
		trophyEl.textContent = rankData.emoji;
		trophyEl.className = 'trophy-emoji animate-pulse';
	}
	if (rankTitle) rankTitle.textContent = rankData.title;
	if (percentEl) percentEl.textContent = `${percentage}%`;
	if (messageEl) messageEl.textContent = rankData.message;
	if (emojiEl) emojiEl.textContent = rankData.emoji;
	if (card) {
		card.className = `trophy-ranking-card celebration-${rankData.tier} animate-bounce`;
		if (rankData.tier === 'legendary') {
			card.classList.add('shimmer', 'pulse-glow');
			card.style.background = 'linear-gradient(90deg, #FFD700, #FF6B35, #57C5B6, #FFD700)';
		}
		setTimeout(() => card.classList.remove('animate-bounce'), 900);
	}
}

// ===============================
// Stats Grid
// ===============================
export function renderStatsGrid(score, xp, maxStreak, total) {
	const stats = [
		{ icon: '⚡', value: xp, label: 'XP Earned', color: 'var(--cw-yellow)' },
		{ icon: '🎯', value: score, label: 'Correct Answers', color: '#2ecc40' },
		{ icon: '🔥', value: maxStreak, label: 'Best Streak', color: 'var(--cw-orange)' },
		{ icon: '🏆', value: total, label: 'Total Questions', color: 'var(--cw-blue)' },
	];
	const grid = document.querySelector('.results-stats-grid');
	if (!grid) return;
	grid.innerHTML = '';
	stats.forEach((stat, i) => {
		const card = document.createElement('div');
		card.className = 'stat-card';
		card.style.background = stat.color;
		card.innerHTML = `
			<span class="stat-icon animate-rotate">${stat.icon}</span>
			<span class="stat-value" id="stat-value-${i}">0</span>
			<span class="stat-label">${stat.label}</span>
		`;
		setTimeout(() => card.classList.add('animate-scale-in', 'animate-fade-in'), 100 + i * 120);
		grid.appendChild(card);
		// Animate value count-up
		const valueEl = card.querySelector('.stat-value');
		let start = 0;
		const end = stat.value;
		const duration = 900;
		const startTime = performance.now();
		function animate(now) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.floor(start + (end - start) * eased);
			valueEl.textContent = current;
			if (progress < 1) requestAnimationFrame(animate);
		}
		requestAnimationFrame(animate);
	});
}

// ===============================
// Share Buttons
// ===============================
export function setupShareButtons() {
	const score = AppState.score || 0;
	const total = 10;
	const url = window.location.origin + window.location.pathname;
	const text = `I scored ${score}/${total} on H2O Hero Quiz!`;
	const hashtags = 'charitywater,cleanwater';
	const twitterBtn = document.querySelector('.share-btn.twitter');
	const facebookBtn = document.querySelector('.share-btn.facebook');
	const copyBtn = document.querySelector('.share-btn.copy-link');
	if (twitterBtn) {
		twitterBtn.onclick = () => {
			const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
			window.open(shareUrl, '_blank');
		};
	}
	if (facebookBtn) {
		facebookBtn.onclick = () => {
			const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
			window.open(shareUrl, '_blank');
		};
	}
	if (copyBtn) {
		copyBtn.onclick = () => {
			navigator.clipboard.writeText(url).then(() => {
				showToast('Link copied!');
			});
		};
	}
}

function showToast(message) {
	let toast = document.createElement('div');
	toast.className = 'toast-notification';
	toast.textContent = message;
	document.body.appendChild(toast);
	setTimeout(() => toast.classList.add('animate-fade-in'), 50);
	setTimeout(() => toast.classList.remove('animate-fade-in'), 1800);
	setTimeout(() => toast.remove(), 2000);
}

// ===============================
// Play Again Button
// ===============================
export function setupPlayAgainButton() {
	const btn = document.querySelector('.play-again-btn');
	if (btn) {
		btn.onclick = () => {
			if (confirm('Are you sure you want to play again? Your progress will be reset.')) {
				StateManager.resetState();
				navigateToScreen('landing-page');
				// Clear celebration effects
				document.getElementById('confetti-container')?.innerHTML = '';
				document.getElementById('celebration-container')?.innerHTML = '';
			}
		};
	}
}

// ===============================
// Charity: Water Donation
// ===============================
export function setupCharityWaterDonation() {
	const donateBtn = document.querySelector('.donate-btn');
	if (donateBtn) {
		donateBtn.onclick = () => {
			window.open('https://www.charitywater.org/donate', '_blank');
			if (window.gtag) window.gtag('event', 'donate_click');
		};
	}
}

// ===============================
// Results Page Logic
// ===============================
export function initResultsPage() {
	const score = AppState.score || 0;
	const xp = AppState.xp || 0;
	const maxStreak = AppState.maxStreak || 0;
	const total = 10;
	const percentage = Math.round((score / total) * 100);
	const trophy = calculateTrophyRank(percentage, maxStreak);
	renderScore(score, total);
	renderCharacterSummary();
	renderTrophyCard(trophy, percentage);
	renderStatsGrid(score, xp, maxStreak, total);
	setupShareButtons();
	setupPlayAgainButton();
	triggerConfetti(trophy.confettiIntensity);
	triggerCelebrationEffects(trophy.tier);
	if (window.gtag) window.gtag('event', 'quiz_complete', { score, xp, maxStreak, percentage, trophy: trophy.title });
}

export function calculateTrophyRank(percentage, maxStreak) {
	if (percentage === 100 && maxStreak === 10) {
		return { emoji: '👑', title: 'Legendary Hero', color: '#FFD700', message: 'Perfect score and streak! You are a true water legend!', tier: 'legendary', confettiIntensity: 3 };
	} else if (percentage >= 90) {
		return { emoji: '🥇', title: 'Expert Hero', color: '#FFC72C', message: 'Amazing! You mastered the mission!', tier: 'expert', confettiIntensity: 2 };
	} else if (percentage >= 70) {
		return { emoji: '🥈', title: 'Great Hero', color: '#57C5B6', message: 'Great job! You made a big splash!', tier: 'great', confettiIntensity: 2 };
	} else if (percentage >= 50) {
		return { emoji: '🥉', title: 'Good Hero', color: '#1A5F7A', message: 'Good effort! Keep learning and making waves!', tier: 'good', confettiIntensity: 1 };
	} else {
		return { emoji: '💧', title: 'Learning Journey', color: '#4FC3F7', message: 'Every drop counts! Try again to improve your score.', tier: 'journey', confettiIntensity: 1 };
	}
}

export function renderScore(score, total) {
	const scoreEl = document.getElementById('results-score');
	if (!scoreEl) return;
	let start = 0;
	const duration = 1200;
	const startTime = performance.now();
	function animate(now) {
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		const current = Math.floor(start + (score - start) * eased);
		scoreEl.textContent = `${current}/${total}`;
		if (progress < 1) requestAnimationFrame(animate);
		else celebrateMilestone(current, total);
	}
	requestAnimationFrame(animate);
}

function celebrateMilestone(score, total) {
	if (score === total) {
			// Special celebration for perfect score
			triggerConfetti(3);
			triggerCelebrationEffects('legendary');
			// Easter egg: show special message from charity: water team
			setTimeout(() => {
				const msg = document.createElement('div');
				msg.className = 'perfect-score-message';
				msg.innerHTML = '<strong>🎉 Message from the charity: water team:</strong><br>Congratulations on a perfect score and streak! You are a true water legend. Thank you for supporting clean water for all!';
				msg.style.position = 'fixed';
				msg.style.left = '50%';
				msg.style.top = '20%';
				msg.style.transform = 'translate(-50%,0)';
				msg.style.background = '#FFC72C';
				msg.style.color = '#1A5F7A';
				msg.style.padding = '24px 32px';
				msg.style.borderRadius = '16px';
				msg.style.fontSize = '1.2rem';
				msg.style.zIndex = 9999;
				msg.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
				document.body.appendChild(msg);
				setTimeout(() => { msg.remove(); }, 6000);
			}, 1200);
			// Bonus legendary animation
			if (typeof triggerLegendaryCelebration === 'function') {
				setTimeout(() => { triggerLegendaryCelebration(); }, 800);
			}
	}
}

export function renderCharacterSummary() {
	const avatarEmoji = document.getElementById('results-avatar-emoji');
	const heroName = document.getElementById('results-hero-name');
	const levelBadge = document.getElementById('results-final-level');
	const avatar = (window.avatars || []).find(a => a.id === AppState.selectedAvatar) || {};
	if (avatarEmoji) {
		avatarEmoji.textContent = avatar.emoji || '';
		avatarEmoji.classList.add('animate-scale-in', 'animate-pulse');
	}
	if (heroName) heroName.textContent = AppState.heroName || '';
	if (levelBadge) levelBadge.textContent = `Level ${Math.max(1, Math.floor((AppState.xp || 0) / 500) + 1)}`;
}

function renderTrophyCard(trophy, percentage) {
	const trophyEl = document.getElementById('results-trophy');
	const rankTitle = document.getElementById('results-rank-title');
	const percentEl = document.getElementById('results-percentage');
	const messageEl = document.getElementById('results-congrats');
	const emojiEl = document.getElementById('results-celebration-emoji');
	if (trophyEl) trophyEl.textContent = trophy.emoji;
	if (rankTitle) rankTitle.textContent = trophy.title;
	if (percentEl) percentEl.textContent = `${percentage}%`;
	if (messageEl) messageEl.textContent = trophy.message;
	if (emojiEl) emojiEl.textContent = trophy.emoji;
	// Add tier class for celebration effect
	const card = document.querySelector('.trophy-ranking-card');
	if (card) {
		card.className = `trophy-ranking-card celebration-${trophy.tier}`;
	}
}

function renderStatsGrid(score, xp, maxStreak, total) {
	document.getElementById('results-xp')?.textContent = xp;
	document.getElementById('results-correct')?.textContent = score;
	document.getElementById('results-streak')?.textContent = maxStreak;
	document.getElementById('results-total')?.textContent = total;
}

function setupShareButtons() {
	// Add share logic for Twitter, Facebook, Copy Link
}

function setupPlayAgainButton() {
	const btn = document.querySelector('.play-again-btn');
	if (btn) btn.onclick = playAgain;
}

function triggerConfetti(intensity) {
	// Trigger confetti animation based on intensity
}

function triggerCelebrationEffects(tier) {
	// Trigger celebration overlay/effects based on tier
}
