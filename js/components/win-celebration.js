// --- Legendary Celebration ---

export function triggerLegendaryCelebration() {
	const colors = TIER_CONFIGS.legendary.colors;
	createCelebrationContainer();
	createShimmerOverlay();
	// Confetti (extreme)
	setTimeout(() => { startConfetti('extreme'); }, 0);
	// Fireworks & screen flash
	setTimeout(() => { createFireworks(8, colors); createScreenFlash(colors); }, 500);
	// Starburst & wave ripples
	setTimeout(() => { createStarburst(colors); createWaveRipples(3, colors); }, 1000);
	// Trophy descend
	setTimeout(() => { createTrophy(); }, 1200);
	// Lightning strikes
	setTimeout(() => { createLightning(6); }, 1500);
	// Particle swirl
	setTimeout(() => { createParticleSwirl(20, colors); }, 2000);
	// Glitter rain throughout
	for (let t = 0; t < 6; t++) {
		setTimeout(() => { createGlitterRain(30, colors); }, t * 1000);
	}
	// Background pulsing glow
	setTimeout(() => {
		const trophy = celebrationContainer.querySelector('.celebration-trophy');
		if (trophy) createPulsingGlow(trophy);
	}, 1300);
	// Gradient shifts (stub: shimmer overlay already covers)
	// Cleanup after duration
	setTimeout(() => {
		stopConfetti();
		if (celebrationContainer) {
			celebrationContainer.innerHTML = '';
			celebrationContainer.remove();
			celebrationContainer = null;
		}
	}, TIER_CONFIGS.legendary.duration);
}

function createShimmerOverlay() {
	let shimmer = document.createElement('div');
	shimmer.className = 'legendary-shimmer-overlay';
	shimmer.style.position = 'fixed';
	shimmer.style.left = 0;
	shimmer.style.top = 0;
	shimmer.style.width = '100vw';
	shimmer.style.height = '100vh';
	shimmer.style.pointerEvents = 'none';
	shimmer.style.zIndex = 99;
	shimmer.style.opacity = 0.5;
	shimmer.style.background = 'linear-gradient(120deg, rgba(255,215,0,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,215,0,0.2) 100%)';
	shimmer.animate([
		{ backgroundPosition: '0% 0%' },
		{ backgroundPosition: '100% 0%' }
	], {
		duration: 1200,
		iterations: Infinity
	});
	celebrationContainer.appendChild(shimmer);
	setTimeout(() => { shimmer.remove(); }, TIER_CONFIGS.legendary.duration);
}

function createPulsingGlow(element) {
	if (!element) return;
	let glow = document.createElement('div');
	glow.className = 'legendary-pulsing-glow';
	glow.style.position = 'absolute';
	glow.style.left = '-40px';
	glow.style.top = '-40px';
	glow.style.width = '200px';
	glow.style.height = '200px';
	glow.style.borderRadius = '50%';
	glow.style.background = 'radial-gradient(circle, gold 0%, rgba(255,215,0,0.3) 60%, transparent 100%)';
	glow.style.opacity = 0.7;
	glow.style.zIndex = -1;
	element.appendChild(glow);
	glow.animate([
		{ transform: 'scale(1)', opacity: 0.7 },
		{ transform: 'scale(1.2)', opacity: 1 },
		{ transform: 'scale(1)', opacity: 0.7 }
	], {
		duration: 900,
		iterations: 6
	});
	setTimeout(() => { glow.remove(); }, TIER_CONFIGS.legendary.duration - 1000);
}
import { startConfetti, stopConfetti } from './confetti.js';

const TIER_CONFIGS = {
	legendary: {
		colors: ['#FFD700', '#FFC72C', '#FF6B35', '#FF1493'],
		effects: ['confetti', 'fireworks', 'starburst', 'trophy', 'lightning', 'swirl', 'ripples', 'flash', 'glitter'],
		duration: 6000
	},
	expert: {
		colors: ['#57C5B6', '#4FC3F7', '#1A5F7A', '#81D4FA'],
		effects: ['confetti', 'fireworks', 'starburst', 'crown', 'ripples', 'glitter'],
		duration: 6000
	},
	great: {
		colors: ['#4FC3F7', '#81D4FA', '#B3E5FC'],
		effects: ['confetti', 'starburst', 'ripples', 'glitter'],
		duration: 5000
	},
	good: {
		colors: ['#57C5B6', '#81D4FA'],
		effects: ['confetti', 'ripples', 'glitter'],
		duration: 5000
	}
};

let celebrationContainer = null;

function createCelebrationContainer() {
	if (celebrationContainer) return celebrationContainer;
	celebrationContainer = document.createElement('div');
	celebrationContainer.className = 'win-celebration-overlay';
	celebrationContainer.style.position = 'fixed';
	celebrationContainer.style.left = 0;
	celebrationContainer.style.top = 0;
	celebrationContainer.style.width = '100vw';
	celebrationContainer.style.height = '100vh';
	celebrationContainer.style.pointerEvents = 'none';
	celebrationContainer.style.zIndex = 100;
	celebrationContainer.style.overflow = 'hidden';
	document.body.appendChild(celebrationContainer);
	return celebrationContainer;
}

function triggerEffects(tier) {
	const config = TIER_CONFIGS[tier] || TIER_CONFIGS.good;
	// Confetti
	if (config.effects.includes('confetti')) {
		startConfetti('extreme');
	}
	// Effect triggers
	config.effects.forEach(effect => {
		switch (effect) {
			case 'fireworks':
				createFireworks(8, config.colors);
				break;
			case 'starburst':
				createStarburst(config.colors);
				break;
			case 'trophy':
				createTrophy();
				break;
			case 'crown':
				createCrown();
				break;
			case 'lightning':
				createLightning(6);
				break;
			case 'swirl':
				createParticleSwirl(20, config.colors);
				break;
			case 'ripples':
				createWaveRipples(3, config.colors);
				break;
			case 'flash':
				createScreenFlash(config.colors);
				break;
			case 'glitter':
				createGlitterRain(30, config.colors);
				break;
			default:
				break;
		}
	});
}

export function startCelebration(tier, onComplete) {
	stopConfetti();
	createCelebrationContainer();
	triggerEffects(tier);
	const config = TIER_CONFIGS[tier] || TIER_CONFIGS.good;
	setTimeout(() => {
		stopConfetti();
		if (celebrationContainer) {
			celebrationContainer.innerHTML = '';
			celebrationContainer.remove();
			celebrationContainer = null;
		}
		if (typeof onComplete === 'function') onComplete();
	}, config.duration);
}

// --- Effect Functions ---

function createFireworks(count, colors) {
	for (let i = 0; i < count; i++) {
		const x = Math.random() * 80 + 10;
		const y = Math.random() * 40 + 20;
		const burst = document.createElement('div');
		burst.className = 'firework-burst';
		burst.style.position = 'absolute';
		burst.style.left = x + '%';
		burst.style.top = y + '%';
		burst.style.width = '0px';
		burst.style.height = '0px';
		celebrationContainer.appendChild(burst);
		for (let j = 0; j < 12; j++) {
			const angle = (j / 12) * 2 * Math.PI;
			const sparkle = document.createElement('div');
			sparkle.className = 'firework-sparkle';
			sparkle.style.position = 'absolute';
			sparkle.style.left = '0px';
			sparkle.style.top = '0px';
			sparkle.style.width = '10px';
			sparkle.style.height = '10px';
			sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
			sparkle.style.borderRadius = '50%';
			sparkle.style.opacity = 1;
			burst.appendChild(sparkle);
			const radius = 120;
			const delay = i * 200;
			sparkle.animate([
				{ transform: 'scale(0)', opacity: 1 },
				{ transform: `translate(${Math.cos(angle)*radius}px,${Math.sin(angle)*radius}px) scale(2)`, opacity: 0.7 },
				{ transform: `translate(${Math.cos(angle)*radius}px,${Math.sin(angle)*radius}px) scale(3)`, opacity: 0 }
			], {
				duration: 1200,
				delay,
				easing: 'ease-out',
				fill: 'forwards'
			});
			setTimeout(() => { sparkle.remove(); }, 1200 + delay);
		}
		setTimeout(() => { burst.remove(); }, 1600 + i * 200);
	}
}

function createStarburst(colors) {
	const centerX = 50;
	const centerY = 50;
	for (let i = 0; i < 16; i++) {
		const angle = (i / 16) * 2 * Math.PI;
		const star = document.createElement('div');
		star.className = 'starburst-star';
		star.style.position = 'absolute';
		star.style.left = `calc(${centerX}% - 8px)`;
		star.style.top = `calc(${centerY}% - 8px)`;
		star.style.width = '16px';
		star.style.height = '16px';
		star.style.background = colors[Math.floor(Math.random() * colors.length)];
		star.style.borderRadius = '50%';
		star.style.opacity = 0;
		celebrationContainer.appendChild(star);
		star.animate([
			{ transform: 'scale(0)', opacity: 0 },
			{ transform: `translate(${Math.cos(angle)*80}px,${Math.sin(angle)*80}px) scale(1.5)`, opacity: 1 },
			{ transform: `translate(${Math.cos(angle)*80}px,${Math.sin(angle)*80}px) scale(1)`, opacity: 0 }
		], {
			duration: 2000,
			easing: 'ease-in-out',
			fill: 'forwards'
		});
		setTimeout(() => { star.remove(); }, 2000);
	}
}

function createTrophy() {
	const trophy = document.createElement('div');
	trophy.className = 'celebration-trophy';
	trophy.textContent = '🏆';
	trophy.style.position = 'absolute';
	trophy.style.left = 'calc(50% - 60px)';
	trophy.style.top = '-200px';
	trophy.style.fontSize = '120px';
	trophy.style.opacity = 1;
	trophy.style.transform = 'rotate(-180deg) scale(0)';
	celebrationContainer.appendChild(trophy);
	trophy.animate([
		{ top: '-200px', transform: 'rotate(-180deg) scale(0)', opacity: 0 },
		{ top: '40vh', transform: 'rotate(360deg) scale(1.5)', opacity: 1 },
		{ top: '45vh', transform: 'rotate(360deg) scale(1)', opacity: 1 }
	], {
		duration: 1600,
		easing: 'cubic-bezier(.6,.2,.2,1)',
		fill: 'forwards'
	});
	// Secondary wobble
	setTimeout(() => {
		trophy.animate([
			{ transform: 'scale(1) rotate(0deg)' },
			{ transform: 'scale(1.1) rotate(10deg)' },
			{ transform: 'scale(1) rotate(0deg)' }
		], {
			duration: 600,
			iterations: 2
		});
	}, 1700);
	setTimeout(() => { trophy.remove(); }, 3000);
}

function createCrown() {
	const crown = document.createElement('div');
	crown.className = 'celebration-crown';
	crown.textContent = '👑';
	crown.style.position = 'absolute';
	crown.style.left = 'calc(50% - 50px)';
	crown.style.top = '-150px';
	crown.style.fontSize = '100px';
	crown.style.opacity = 1;
	crown.style.color = '#4FC3F7';
	crown.style.transform = 'scale(0)';
	celebrationContainer.appendChild(crown);
	crown.animate([
		{ top: '-150px', transform: 'scale(0)', opacity: 0 },
		{ top: '38vh', transform: 'scale(1.3)', opacity: 1 },
		{ top: '42vh', transform: 'scale(1)', opacity: 1 }
	], {
		duration: 1400,
		easing: 'cubic-bezier(.6,.2,.2,1)',
		fill: 'forwards'
	});
	setTimeout(() => { crown.remove(); }, 2600);
}

function createLightning(count) {
	for (let i = 0; i < count; i++) {
		const bolt = document.createElement('div');
		bolt.className = 'celebration-lightning';
		bolt.textContent = '⚡';
		bolt.style.position = 'absolute';
		bolt.style.left = (10 + i * (80/(count-1))) + '%';
		bolt.style.top = '-60px';
		bolt.style.fontSize = '48px';
		bolt.style.color = '#FFD700';
		bolt.style.opacity = 1;
		bolt.style.transform = 'scaleY(0)';
		celebrationContainer.appendChild(bolt);
		bolt.animate([
			{ top: '-60px', transform: 'scaleY(0)', opacity: 0 },
			{ top: '20vh', transform: 'scaleY(1)', opacity: 1 },
			{ top: '22vh', transform: 'scaleY(0)', opacity: 0 }
		], {
			duration: 500,
			easing: 'cubic-bezier(.6,.2,.2,1)',
			fill: 'forwards'
		});
		setTimeout(() => { bolt.remove(); }, 700);
	}
}

function createParticleSwirl(count, colors) {
	const centerX = 50;
	const centerY = 50;
	for (let i = 0; i < count; i++) {
		const angle = (i / count) * 2 * Math.PI;
		const heart = document.createElement('div');
		heart.className = 'swirl-heart';
		heart.textContent = '💙';
		heart.style.position = 'absolute';
		heart.style.left = `calc(${centerX}% - 12px)`;
		heart.style.top = `calc(${centerY}% - 12px)`;
		heart.style.fontSize = '24px';
		heart.style.opacity = 0;
		celebrationContainer.appendChild(heart);
		heart.animate([
			{ transform: 'scale(0) rotate(0deg)', opacity: 0 },
			{ transform: `translate(${Math.cos(angle)*150}px,${Math.sin(angle)*150}px) scale(1.2) rotate(360deg)`, opacity: 1 },
			{ transform: `translate(${Math.cos(angle)*150}px,${Math.sin(angle)*150}px) scale(1) rotate(720deg)`, opacity: 0 }
		], {
			duration: 3000,
			delay: i * 50,
			easing: 'ease-in-out',
			fill: 'forwards'
		});
		setTimeout(() => { heart.remove(); }, 3200 + i * 50);
	}
}

function createWaveRipples(count, colors) {
	for (let i = 0; i < count; i++) {
		const ripple = document.createElement('div');
		ripple.className = 'wave-ripple';
		ripple.style.position = 'absolute';
		ripple.style.left = 'calc(50% - 60px)';
		ripple.style.top = 'calc(50% - 60px)';
		ripple.style.width = '120px';
		ripple.style.height = '120px';
		ripple.style.border = `4px solid ${colors[i % colors.length]}`;
		ripple.style.borderRadius = '50%';
		ripple.style.opacity = 0.8;
		celebrationContainer.appendChild(ripple);
		ripple.animate([
			{ transform: 'scale(0)', opacity: 0.8 },
			{ transform: 'scale(5)', opacity: 0 }
		], {
			duration: 1200,
			delay: i * 300,
			easing: 'ease-out',
			fill: 'forwards'
		});
		setTimeout(() => { ripple.remove(); }, 1500 + i * 300);
	}
}

function createScreenFlash(colors) {
	const flash = document.createElement('div');
	flash.className = 'screen-flash';
	flash.style.position = 'fixed';
	flash.style.left = 0;
	flash.style.top = 0;
	flash.style.width = '100vw';
	flash.style.height = '100vh';
	flash.style.zIndex = 101;
	flash.style.pointerEvents = 'none';
	flash.style.background = 'linear-gradient(90deg, yellow, orange, pink)';
	flash.style.opacity = 0;
	celebrationContainer.appendChild(flash);
	flash.animate([
		{ opacity: 0 },
		{ opacity: 0.6 },
		{ opacity: 0 },
		{ opacity: 0.4 },
		{ opacity: 0 }
	], {
		duration: 1500,
		easing: 'ease-in-out',
		fill: 'forwards'
	});
	setTimeout(() => { flash.remove(); }, 1600);
}

function createGlitterRain(count, colors) {
	for (let i = 0; i < count; i++) {
		const sparkle = document.createElement('div');
		sparkle.className = 'glitter-sparkle';
		sparkle.style.position = 'absolute';
		sparkle.style.left = Math.random() * 100 + '%';
		sparkle.style.top = '-20px';
		sparkle.style.width = '12px';
		sparkle.style.height = '12px';
		sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
		sparkle.style.borderRadius = '50%';
		sparkle.style.opacity = 0;
		sparkle.style.boxShadow = '0 0 16px 4px ' + sparkle.style.background;
		celebrationContainer.appendChild(sparkle);
		const duration = 2000 + Math.random() * 2000;
		sparkle.animate([
			{ top: '-20px', transform: 'rotate(0deg)', opacity: 0 },
			{ top: '80vh', transform: 'rotate(360deg)', opacity: 1 },
			{ top: '100vh', transform: 'rotate(720deg)', opacity: 0 }
		], {
			duration,
			easing: 'ease-in-out',
			fill: 'forwards'
		});
		setTimeout(() => { sparkle.remove(); }, duration + 200);
	}
}
