
import { BRAND_COLORS, CONFETTI_INTENSITY_LOW, CONFETTI_INTENSITY_MEDIUM, CONFETTI_INTENSITY_HIGH, CONFETTI_INTENSITY_EXTREME } from '../data/constants.js';

const EMOJIS = ['💧','🌊','✨','🌟','💫','⭐','🎉','🎊','💙','💚'];
const SHAPES = ['circle', 'square', 'emoji'];
const INTENSITY_MAP = {
	low: CONFETTI_INTENSITY_LOW,
	medium: CONFETTI_INTENSITY_MEDIUM,
	high: CONFETTI_INTENSITY_HIGH,
	extreme: CONFETTI_INTENSITY_EXTREME
};

let confettiContainer = null;
let confettiTimeouts = [];

function randomColor() {
	const keys = Object.keys(BRAND_COLORS);
	return BRAND_COLORS[keys[Math.floor(Math.random() * keys.length)]];
}

function randomEmoji() {
	return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function createConfetti(intensity = 'medium', container) {
	const count = INTENSITY_MAP[intensity] || CONFETTI_INTENSITY_MEDIUM;
	for (let i = 0; i < count; i++) {
		const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
		const piece = document.createElement('div');
		piece.classList.add('confetti-piece');
		piece.style.position = 'absolute';
		piece.style.left = Math.random() * 100 + '%';
		piece.style.top = '-10px';
		piece.style.pointerEvents = 'none';
		piece.style.zIndex = 9999;
		let content = '';
		if (shape === 'emoji') {
			content = randomEmoji();
			piece.textContent = content;
			piece.style.fontSize = (24 + Math.random() * 16) + 'px';
		} else {
			piece.style.width = piece.style.height = (12 + Math.random() * 12) + 'px';
			piece.style.background = randomColor();
			piece.style.borderRadius = shape === 'circle' ? '50%' : '4px';
		}
		// Animation
		const drift = (Math.random() - 0.5) * 120; // px
		const rotate = 720 + Math.random() * 360;
		const scale1 = 1.2;
		const scale2 = 0.8;
		const duration = 3000 + Math.random() * 2000;
		piece.animate([
			{ transform: `translateY(0) translateX(0) rotate(0deg) scale(1)`, opacity: 1 },
			{ transform: `translateY(50vh) translateX(${drift/2}px) rotate(${rotate/2}deg) scale(${scale1})`, opacity: 0.8 },
			{ transform: `translateY(100vh) translateX(${drift}px) rotate(${rotate}deg) scale(${scale2})`, opacity: 0 }
		], {
			duration,
			easing: 'cubic-bezier(.6,.2,.2,1)'
		});
		container.appendChild(piece);
		// Remove after animation
		const timeout = setTimeout(() => {
			piece.remove();
		}, duration);
		confettiTimeouts.push(timeout);
	}
}

export function startConfetti(intensity = 'medium') {
	if (!confettiContainer) {
		confettiContainer = document.createElement('div');
		confettiContainer.className = 'confetti-container';
		confettiContainer.style.position = 'fixed';
		confettiContainer.style.left = 0;
		confettiContainer.style.top = 0;
		confettiContainer.style.width = '100vw';
		confettiContainer.style.height = '100vh';
		confettiContainer.style.pointerEvents = 'none';
		confettiContainer.style.zIndex = 9999;
		document.body.appendChild(confettiContainer);
	}
	createConfetti(intensity, confettiContainer);
}

export function stopConfetti() {
	confettiTimeouts.forEach(clearTimeout);
	confettiTimeouts = [];
	if (confettiContainer) {
		confettiContainer.innerHTML = '';
		confettiContainer.remove();
		confettiContainer = null;
	}
}
