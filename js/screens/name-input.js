
// ===============================
// Name Suggestions
// ===============================
const nameSuggestions = [
	'Captain Splash', 'The Hydrator', 'Aqua Guardian', 'River Runner', 'Splash Master',
	'Wave Whisperer', 'Rainmaker', 'Blue Surge', 'Liquid Legend', 'Stream Dreamer',
	'Bubble Blazer', 'Tide Tamer', 'Water Warden', 'Drip Dynamo', 'Soak Star',
	'Hydro Hero', 'Ripple Rider', 'Floodlight', 'Cascade Kid', 'Spring Spirit',
	'Gush Genius', 'Puddle Pro', 'Aqua Ace', 'Flowmaster', 'Surge Seeker'
];

// ===============================
// Name Input Logic
// ===============================
export function initNameInput() {
	// Display selected avatar
	const avatarEmoji = document.getElementById('selected-avatar-emoji');
	const avatarName = document.getElementById('selected-avatar-name');
	if (avatarEmoji && avatarName && AppState.selectedAvatar) {
		const avatar = (window.avatars || []).find(a => a.id === AppState.selectedAvatar) || {};
		avatarEmoji.textContent = avatar.emoji || '';
		avatarName.textContent = avatar.name || '';
	}
	// Set up input field
	const input = document.getElementById('hero-name-input');
	if (input) {
		input.value = AppState.heroName || '';
		input.addEventListener('input', handleNameInput);
	}
	// Generate random name suggestions
	renderSuggestions();
	// Set up character counter
	const counter = document.getElementById('char-counter');
	if (counter && input) counter.textContent = `${input.value.length}/20`;
	// Set up validation and next button
	handleNameInput({ target: input });
	const nextBtn = document.querySelector('#name-input .next-btn');
	if (nextBtn) {
		nextBtn.onclick = () => {
			const name = input.value.trim();
			const { valid, error } = validateName(name);
			if (!valid) {
				const errEl = document.getElementById('name-error');
				if (errEl) {
					errEl.textContent = error;
					errEl.style.display = 'block';
				}
				return;
			}
			StateManager.updateState({ heroName: name });
			navigateToScreen('character-confirmation');
		};
	}
}

function renderSuggestions() {
	const chipsContainer = document.querySelector('#name-input .suggested-names-chips');
	if (!chipsContainer) return;
	chipsContainer.innerHTML = '';
	// Pick 6 random unique names
	const shuffled = nameSuggestions.slice().sort(() => Math.random() - 0.5);
	const picks = shuffled.slice(0, 6);
	picks.forEach((name, i) => {
		const chip = document.createElement('button');
		chip.className = 'name-chip';
		chip.type = 'button';
		chip.textContent = name;
		chip.setAttribute('data-suggested-name', name);
		chip.addEventListener('click', () => selectSuggestion(name, chip));
		setTimeout(() => chip.classList.add('animate-scale-in', 'animate-fade-in'), 100 + i * 80);
		chipsContainer.appendChild(chip);
	});
}

function handleNameInput(e) {
	const input = e.target;
	const value = input.value;
	const counter = document.getElementById('char-counter');
	if (counter) counter.textContent = `${value.length}/20`;
	// Easter egg: show preview badge/message for special names
	const previewBadge = document.getElementById('special-name-preview');
	if (previewBadge) previewBadge.remove();
	const name = value.trim().toLowerCase();
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
		badgeEl.id = 'special-name-preview';
		badgeEl.className = 'special-badge';
		badgeEl.textContent = badge;
		badgeEl.title = message;
		input.after(badgeEl);
	}
	const errEl = document.getElementById('name-error');
	const nextBtn = document.querySelector('#name-input .next-btn');
	const { valid, error } = validateName(value);
	if (errEl) {
		if (!valid && value.length > 0) {
			errEl.textContent = error;
			errEl.style.display = 'block';
		} else {
			errEl.textContent = '';
			errEl.style.display = 'none';
		}
	}
	if (nextBtn) nextBtn.disabled = !valid;
}

function selectSuggestion(name, chip) {
	const input = document.getElementById('hero-name-input');
	if (input) {
		input.value = name;
		input.focus();
		handleNameInput({ target: input });
	}
	if (chip) {
		chip.classList.add('selected', 'animate-bounce');
		setTimeout(() => chip.classList.remove('animate-bounce'), 500);
	}
}

function validateName(name) {
	const profanity = /\b(fuck|shit|damn|bitch|asshole|bastard|dick|cunt|piss|crap|slut|whore)\b/i;
	if (!name || name.length < 2) return { valid: false, error: 'Name must be at least 2 characters.' };
	if (name.length > 20) return { valid: false, error: 'Name must be 20 characters or less.' };
	if (!/^[\w\s'-]+$/.test(name)) return { valid: false, error: 'Name can only contain letters, numbers, spaces, and - \' characters.' };
	if (profanity.test(name)) return { valid: false, error: 'Please choose a different name.' };
	return { valid: true };
}
