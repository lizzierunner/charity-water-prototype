
// ===============================
// Character Confirmation Logic
// ===============================
export function initCharacterConfirmation() {
	renderCharacter();
	renderMissionBriefing();
	// Animate avatar
	const avatar = document.getElementById('confirm-hero-emoji');
	if (avatar) {
		avatar.classList.add('animate-scale-in', 'animate-pulse');
	}
	// Animate particles in background
	animateBackgroundParticles();
	// Set up button handlers
	const startBtn = document.querySelector('#character-confirmation .start-mission-btn');
	if (startBtn) {
		startBtn.onclick = () => {
			startBtn.classList.add('animate-bounce');
			setTimeout(() => {
				startBtn.classList.remove('animate-bounce');
				StateManager.updateState({ startTime: Date.now() });
				navigateToScreen('quiz-screen');
				if (window.gtag) window.gtag('event', 'quiz_start');
			}, 400);
		};
	}
	const backBtn = document.querySelector('#character-confirmation .back-edit-btn');
	if (backBtn) {
		backBtn.onclick = () => {
			navigateToScreen('name-input');
		};
	}
}

function renderCharacter() {
	const avatarEmoji = document.getElementById('confirm-hero-emoji');
	const heroName = document.getElementById('confirm-hero-name');
	const levelBadge = document.querySelector('#character-confirmation .level-badge');
	const xpDisplay = document.querySelector('#character-confirmation .xp-display');
	const avatar = (window.avatars || []).find(a => a.id === AppState.selectedAvatar) || {};
	if (avatarEmoji) avatarEmoji.textContent = avatar.emoji || '';
	if (heroName) heroName.textContent = AppState.heroName || '';
	if (levelBadge) levelBadge.textContent = 'Level 1';
	if (xpDisplay) xpDisplay.textContent = '0 XP';
	// Animated glow effect
	const card = document.querySelector('#character-confirmation .character-card');
	if (card) card.classList.add('pulse-glow');
	// Special name Easter eggs
	if (heroName && AppState.heroName) {
	  const name = AppState.heroName.trim().toLowerCase();
	  let badge = '';
	  let message = '';
	  if (name === 'charity water') {
	    badge = '💛 Special Badge';
	    message = 'You unlocked the charity: water badge!';
	  } else if (name === 'scott harrison') {
	    badge = '👑 Founder Badge';
	    message = 'Welcome, Scott Harrison! Thank you for founding charity: water.';
	  } else if (name === 'h2o') {
	    badge = '🥚 Easter Egg';
	    message = 'H2O detected! Stay hydrated, hero.';
	  }
	  if (badge) {
	    const badgeEl = document.createElement('span');
	    badgeEl.className = 'special-badge';
	    badgeEl.textContent = badge;
	    badgeEl.title = message;
	    levelBadge?.after(badgeEl);
	    setTimeout(() => {
	      badgeEl.classList.add('animate-scale-in', 'animate-fade-in');
	    }, 200);
	    // Show message as toast
	    if (typeof showToast === 'function') showToast(message);
	  }
	}
}

function renderMissionBriefing() {
	const briefing = document.querySelector('#character-confirmation .mission-briefing-card');
	if (!briefing) return;
	briefing.innerHTML = `
		<h3>Your Mission</h3>
		<ul>
			<li>Answer 10 questions about the water crisis</li>
			<li>Earn XP for correct answers</li>
			<li>Learn about charity: water's impact</li>
			<li>Unlock achievements and rankings</li>
		</ul>
		<p class="mission-motivation">You’re about to make a splash! Good luck, hero!</p>
	`;
}

function animateBackgroundParticles() {
	const bg = document.querySelector('#character-confirmation .character-confirm-bg');
	if (!bg) return;
	bg.innerHTML = '';
	for (let i = 0; i < 14; i++) {
		const droplet = document.createElement('span');
		droplet.className = 'floating-droplet';
		const size = 14 + Math.random() * 18;
		droplet.style.width = `${size}px`;
		droplet.style.height = `${size}px`;
		droplet.style.left = `${Math.random() * 100}%`;
		droplet.style.top = `${Math.random() * 90}%`;
		droplet.style.animationDelay = `${Math.random() * 2}s`;
		droplet.style.animationDuration = `${2 + Math.random() * 2}s`;
		droplet.innerHTML = '💧';
		bg.appendChild(droplet);
	}
}
