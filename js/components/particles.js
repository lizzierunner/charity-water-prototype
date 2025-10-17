// Particle system for floating water-themed effects

const PARTICLE_EMOJIS = ['💧','🌊','✨','💫'];
let particleAnimations = [];
let paused = false;

export function createFloatingParticles(container, count = 20) {
	removeParticles(container);
	for (let i = 0; i < count; i++) {
		const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];
		const size = 16 + Math.random() * 16;
		const x = Math.random() * 100;
		const y = Math.random() * 100;
		const particle = document.createElement('span');
		particle.className = 'floating-particle';
		particle.textContent = emoji;
		particle.style.position = 'absolute';
		particle.style.left = x + '%';
		particle.style.top = y + '%';
		particle.style.fontSize = size + 'px';
		particle.style.opacity = (0.1 + Math.random() * 0.5).toFixed(2);
		particle.style.pointerEvents = 'auto'; // Allow click
		container.appendChild(particle);
		// Animation
		const driftX = (Math.random() - 0.5) * 40;
		const floatY = 20 + Math.random() * 20;
		const duration = 4000 + Math.random() * 6000;
		const delay = i * 120;
		const anim = particle.animate([
			{ transform: `translateY(0px) translateX(0px) scale(0.5)`, opacity: particle.style.opacity },
			{ transform: `translateY(-${floatY}px) translateX(${driftX/2}px) scale(1)`, opacity: 0.6 },
			{ transform: `translateY(${floatY}px) translateX(${driftX}px) scale(0.5)`, opacity: 0.1 }
		], {
			duration,
			delay,
			iterations: Infinity,
			direction: 'alternate',
			easing: 'ease-in-out'
		});
		particleAnimations.push(anim);
		// Easter egg: click for small animation
		particle.addEventListener('click', (e) => {
			e.stopPropagation();
			particle.animate([
				{ transform: 'scale(1)', opacity: 1 },
				{ transform: 'scale(1.5) rotate(20deg)', opacity: 0.8 },
				{ transform: 'scale(1) rotate(-20deg)', opacity: 1 }
			], {
				duration: 500,
				easing: 'ease-in-out'
			});
		});
	}
}

export function createBackgroundWaves(container) {
	removeParticles(container);
	for (let i = 0; i < 4; i++) {
		const wave = document.createElement('div');
		wave.className = 'background-wave';
		wave.style.position = 'absolute';
		wave.style.left = (i * 25) + '%';
		wave.style.top = (20 + i * 15) + '%';
		wave.style.width = (180 + i * 60) + 'px';
		wave.style.height = (180 + i * 60) + 'px';
		wave.style.borderRadius = '50%';
		wave.style.background = `radial-gradient(circle at 60% 40%, #57C5B6 0%, #4FC3F7 80%, transparent 100%)`;
		wave.style.opacity = (0.1 + Math.random() * 0.2).toFixed(2);
		wave.style.filter = 'blur(12px)';
		wave.style.pointerEvents = 'none';
		container.appendChild(wave);
		// Animation
		const moveX = 60 + Math.random() * 40;
		const moveY = 20 + Math.random() * 30;
		const duration = 12000 + Math.random() * 6000;
		const anim = wave.animate([
			{ transform: 'translate(0px,0px)' },
			{ transform: `translate(${moveX}px,${moveY}px)` },
			{ transform: 'translate(0px,0px)' }
		], {
			duration,
			iterations: Infinity,
			direction: 'alternate',
			easing: 'ease-in-out'
		});
		particleAnimations.push(anim);
	}
}

export function removeParticles(container) {
	if (!container) return;
	while (container.firstChild) container.removeChild(container.firstChild);
	particleAnimations.forEach(anim => anim.cancel());
	particleAnimations = [];
}

export function pauseParticles() {
	paused = true;
	particleAnimations.forEach(anim => anim.pause());
}

export function resumeParticles() {
	paused = false;
	particleAnimations.forEach(anim => anim.play());
}
// Particles component
