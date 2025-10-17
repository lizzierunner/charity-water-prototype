// Animation helpers for H2O Hero Quiz

export function animate(element, keyframes, options = {}) {
	const opts = Object.assign({ duration: 400, easing: 'cubic-bezier(.6,.2,.2,1)' }, options);
	return element.animate(keyframes, opts);
}

export function fadeIn(element, duration = 300) {
	return animate(element, [ { opacity: 0 }, { opacity: 1 } ], { duration });
}

export function fadeOut(element, duration = 300) {
	return animate(element, [ { opacity: 1 }, { opacity: 0 } ], { duration });
}

export function slideIn(element, direction = 'up', duration = 600) {
	let from, to;
	switch (direction) {
		case 'up': from = '40px'; to = '0px'; break;
		case 'down': from = '-40px'; to = '0px'; break;
		case 'left': from = '40px'; to = '0px'; break;
		case 'right': from = '-40px'; to = '0px'; break;
		default: from = '40px'; to = '0px';
	}
	const prop = (direction === 'up' || direction === 'down') ? 'translateY' : 'translateX';
	return animate(element, [
		{ transform: `${prop}(${from})`, opacity: 0 },
		{ transform: `${prop}(${to})`, opacity: 1 }
	], { duration });
}

export function slideOut(element, direction = 'down', duration = 600) {
	let to;
	switch (direction) {
		case 'up': to = '-40px'; break;
		case 'down': to = '40px'; break;
		case 'left': to = '-40px'; break;
		case 'right': to = '40px'; break;
		default: to = '40px';
	}
	const prop = (direction === 'up' || direction === 'down') ? 'translateY' : 'translateX';
	return animate(element, [
		{ transform: `${prop}(0px)`, opacity: 1 },
		{ transform: `${prop}(${to})`, opacity: 0 }
	], { duration });
}

export function scaleIn(element, duration = 400) {
	return animate(element, [ { transform: 'scale(0.7)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 } ], { duration });
}

export function scaleOut(element, duration = 400) {
	return animate(element, [ { transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0.7)', opacity: 0 } ], { duration });
}

export function shake(element, duration = 500) {
	return animate(element, [
		{ transform: 'translateX(0px)' },
		{ transform: 'translateX(-10px)' },
		{ transform: 'translateX(10px)' },
		{ transform: 'translateX(-6px)' },
		{ transform: 'translateX(6px)' },
		{ transform: 'translateX(0px)' }
	], { duration });
}

export function bounce(element, duration = 600) {
	return animate(element, [
		{ transform: 'translateY(0px)' },
		{ transform: 'translateY(-20px)' },
		{ transform: 'translateY(0px)' },
		{ transform: 'translateY(-10px)' },
		{ transform: 'translateY(0px)' }
	], { duration });
}

export function pulse(element, duration = 1000) {
	return animate(element, [
		{ transform: 'scale(1)', opacity: 1 },
		{ transform: 'scale(1.2)', opacity: 0.7 },
		{ transform: 'scale(1)', opacity: 1 }
	], { duration });
}

export function staggerAnimation(elements, animationFn, delay = 100) {
	const promises = [];
	elements.forEach((el, i) => {
		const p = new Promise(resolve => {
			setTimeout(() => {
				const anim = animationFn(el);
				anim.onfinish = resolve;
			}, i * delay);
		});
		promises.push(p);
	});
	return Promise.all(promises);
}

export function countUp(element, start, end, duration = 1000) {
	return new Promise(resolve => {
		const startTime = performance.now();
		function format(n) {
			return n.toLocaleString();
		}
		function step(now) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const value = Math.round(start + (end - start) * easeOut(progress));
			element.textContent = format(value);
			if (progress < 1) requestAnimationFrame(step);
			else resolve();
		}
		function easeOut(t) {
			return 1 - Math.pow(1 - t, 3);
		}
		requestAnimationFrame(step);
	});
}

export function scrollToTop(smooth = true) {
	window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

export function waitFor(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// Animations utility
