
// ===============================
// Landing Page Logic
// ===============================

export function initLandingPage() {
	// Animate in title
	const title = document.querySelector('#landing-page .hero-title');
	if (title) {
		title.classList.add('animate-fade-in', 'animate-slide-up');
	}
	// Stagger in stat cards
	const statCards = document.querySelectorAll('#landing-page .stat-card');
	statCards.forEach((card, i) => {
		setTimeout(() => {
			card.classList.add('animate-scale-in', 'animate-fade-in');
		}, 200 + i * 180);
	});
	// Animate start button
	const startBtn = document.querySelector('#landing-page .cta-btn');
	if (startBtn) {
		startBtn.classList.add('animate-pulse');
		startBtn.addEventListener('click', startMission, { once: true });
	}
	// Start floating particle animation
	createFloatingParticles(18);
	// Animate stat numbers
	updateStatCards();
}

function startMission(e) {
	const btn = e?.currentTarget || document.querySelector('#landing-page .cta-btn');
	if (btn) {
		btn.classList.add('animate-bounce');
		setTimeout(() => {
			btn.classList.remove('animate-bounce');
			// Transition animation (fade out landing, fade in avatar-selection)
			navigateToScreen('avatar-selection', true);
			// Track analytics event (placeholder)
			if (window.gtag) window.gtag('event', 'start_mission');
		}, 400);
	}
}

function updateStatCards() {
	const stats = [
		{ selector: '[data-stat="people-without-water"] .stat-value', value: 703000000, format: n => '703 million' },
		{ selector: '[data-stat="donations-to-projects"] .stat-value', value: 100, format: n => '100%' },
		{ selector: '[data-stat="people-served"] .stat-value', value: 17000000, format: n => '17+ million' },
	];
	stats.forEach(stat => {
		const el = document.querySelector('#landing-page ' + stat.selector);
		if (!el) return;
		let start = 0;
		const end = stat.value;
		const duration = 1200;
		const startTime = performance.now();
		function animate(now) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
			const current = Math.floor(start + (end - start) * eased);
			el.textContent = stat.format ? stat.format(current) : current;
			if (progress < 1) requestAnimationFrame(animate);
		}
		requestAnimationFrame(animate);
	});
}

function createFloatingParticles(count = 12) {
	const container = document.querySelector('#landing-page .particles-bg');
	if (!container) return;
	container.innerHTML = '';
	for (let i = 0; i < count; i++) {
		const droplet = document.createElement('span');
		droplet.className = 'floating-droplet';
		const size = 16 + Math.random() * 24;
		droplet.style.width = `${size}px`;
		droplet.style.height = `${size}px`;
		droplet.style.left = `${Math.random() * 100}%`;
		droplet.style.top = `${Math.random() * 80}%`;
		droplet.style.animationDelay = `${Math.random() * 2}s`;
		droplet.style.animationDuration = `${2.5 + Math.random() * 2}s`;
		droplet.innerHTML = '💧';
		container.appendChild(droplet);
	}
}
