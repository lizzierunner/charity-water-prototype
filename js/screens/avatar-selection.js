
// ===============================
// Avatars Data
// ===============================
const avatars = [
	{ id: 'water-mage', emoji: '🧙‍♂️', name: 'Water Mage', description: 'Master of magical water spells.' },
	{ id: 'ocean-warrior', emoji: '🌊', name: 'Ocean Warrior', description: 'Defender of the seas.' },
	{ id: 'hydro-engineer', emoji: '👷‍♀️', name: 'Hydro Engineer', description: 'Builder of water solutions.' },
	{ id: 'rain-shaman', emoji: '🌧️', name: 'Rain Shaman', description: 'Bringer of rain and renewal.' },
	{ id: 'aqua-scientist', emoji: '🔬', name: 'Aqua Scientist', description: 'Explorer of water mysteries.' },
	{ id: 'tide-ranger', emoji: '🏄‍♂️', name: 'Tide Ranger', description: 'Rider of the waves.' },
	{ id: 'bubble-guardian', emoji: '🫧', name: 'Bubble Guardian', description: 'Protector of pure water.' },
	{ id: 'wave-rider', emoji: '🏄‍♀️', name: 'Wave Rider', description: 'Champion of the surf.' },
];

// ===============================
// Avatar Selection Logic
// ===============================
export function initAvatarSelection() {
	renderAvatarCards();
	const nextBtn = document.querySelector('#avatar-selection .next-btn');
	const backBtn = document.querySelector('#avatar-selection .back-btn');
	// Highlight previously selected avatar
	const selected = AppState.selectedAvatar;
	if (selected) {
		selectAvatar(selected, false);
		if (nextBtn) nextBtn.disabled = false;
	} else {
		if (nextBtn) nextBtn.disabled = true;
	}
	// Next button handler
	if (nextBtn) {
		nextBtn.onclick = () => {
			if (!AppState.selectedAvatar) return;
			StateManager.updateState({ selectedAvatar: AppState.selectedAvatar });
			navigateToScreen('name-input');
		};
	}
	// Back button handler
	if (backBtn) {
		backBtn.onclick = () => {
			navigateToScreen('landing-page');
		};
	}
}

function renderAvatarCards() {
	const grid = document.querySelector('#avatar-selection .avatar-grid');
	if (!grid) return;
	grid.innerHTML = '';
	avatars.forEach((avatar, i) => {
		const card = document.createElement('button');
		card.className = 'avatar-card';
		card.setAttribute('data-avatar', avatar.id);
		card.setAttribute('type', 'button');
		card.setAttribute('aria-label', avatar.name);
		card.innerHTML = `
			<span class="avatar-emoji">${avatar.emoji}</span>
			<span class="avatar-name">${avatar.name}</span>
		`;
		card.addEventListener('click', () => selectAvatar(avatar.id, true));
		setTimeout(() => {
			card.classList.add('animate-scale-in', 'animate-fade-in');
		}, 100 + i * 120);
		grid.appendChild(card);
	});
}

function selectAvatar(avatarId, animate = true) {
	const cards = document.querySelectorAll('#avatar-selection .avatar-card');
	cards.forEach(card => card.classList.remove('selected'));
	const selectedCard = Array.from(cards).find(card => card.getAttribute('data-avatar') === avatarId);
	if (selectedCard) {
		selectedCard.classList.add('selected');
		if (animate) {
			selectedCard.classList.add('animate-bounce');
			setTimeout(() => selectedCard.classList.remove('animate-bounce'), 500);
		}
		// Play selection sound effect (if enabled)
		if (window.playSoundEffect) window.playSoundEffect('select');
	}
	AppState.selectedAvatar = avatarId;
	const nextBtn = document.querySelector('#avatar-selection .next-btn');
	if (nextBtn) nextBtn.disabled = false;
}
