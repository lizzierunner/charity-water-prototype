// General helper functions for H2O Hero Quiz

export function formatNumber(num) {
	return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function formatPercentage(value, total) {
	if (!total) return '0%';
	return Math.round((value / total) * 100) + '%';
}

export function formatLargeNumber(num) {
	if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
	if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K';
	return num.toString();
}

export function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray(array) {
	const arr = array.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function debounce(func, delay) {
	let timeout;
	return function(...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}

export function throttle(func, limit) {
	let inThrottle;
	return function(...args) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
}

export function isValidName(name) {
	if (!name || typeof name !== 'string') return false;
	if (name.length < 2 || name.length > 20) return false;
	if (!/^[a-zA-Z0-9 _-]+$/.test(name)) return false;
	// Simple profanity filter
	const profane = ['badword','test','dummy'];
	const lower = name.toLowerCase();
	if (profane.some(w => lower.includes(w))) return false;
	return true;
}

export function sanitizeInput(input) {
	if (typeof input !== 'string') return '';
	return input.replace(/<[^>]*>?/gm, '').replace(/["'&<>]/g, c => ({ '"':'&quot;', "'":'&#39;', '&':'&amp;', '<':'&lt;', '>':'&gt;' }[c]));
}

export function createElement(tag, className, textContent) {
	const el = document.createElement(tag);
	if (className) el.className = className;
	if (textContent) el.textContent = textContent;
	return el;
}

export function getQueryParam(param) {
	const url = new URL(window.location.href);
	return url.searchParams.get(param);
}

export function setQueryParam(param, value) {
	const url = new URL(window.location.href);
	url.searchParams.set(param, value);
	window.history.replaceState({}, '', url);
}

export function copyToClipboard(text) {
	if (!navigator.clipboard) return false;
	navigator.clipboard.writeText(text);
	return true;
}

export function shareOnTwitter(text, url, hashtags = '') {
	const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
	window.open(shareUrl, '_blank');
}

export function shareOnFacebook(url) {
	const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
	window.open(shareUrl, '_blank');
}

export function trackEvent(eventName, eventData) {
	// Placeholder for analytics integration
	// e.g., window.gtag('event', eventName, eventData);
}
// Helper functions
