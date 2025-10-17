// Logo click counter Easter egg
let logoClickCount = 0;
function showBonusFact() {
	// Show bonus fact modal or toast
	alert('💧 Bonus Fact: Every $40 donated to charity: water can give one person clean water for life!');
}

function setupLogoClickEasterEgg() {
	const logos = document.querySelectorAll('.charity-water-logo');
	logos.forEach(logo => {
		logo.addEventListener('click', () => {
			logoClickCount++;
			if (logoClickCount === 10) {
				showBonusFact();
				logoClickCount = 0;
			}
		});
	});
}

// Initialize logo click counter on DOMContentLoaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupLogoClickEasterEgg);
} else {
	setupLogoClickEasterEgg();
}
// CharityWaterLogo component and renderLogo function

const VARIANTS = {
	full: (size) => `<span class="cw-logo-icon" style="font-size:${size}">💧</span> <span class="cw-logo-text" style="font-size:${size};font-weight:bold;">charity: water</span>`,
	icon: (size) => `<span class="cw-logo-icon" style="font-size:${size}">💧</span>`,
	wordmark: (size) => `<span class="cw-logo-text" style="font-size:${size};font-weight:bold;">charity: water</span>`,
	compact: (size) => `<span class="cw-logo-compact" style="font-size:${size};font-weight:bold;">c:w</span>`
};

const SIZE_MAP = {
	sm: '14px',
	md: '18px',
	lg: '24px'
};

const BRAND_YELLOW = '#FFC72C';

function addBobbingAnimation(el) {
	el.style.display = 'inline-block';
	el.animate([
		{ transform: 'translateY(0px)' },
		{ transform: 'translateY(-6px)' },
		{ transform: 'translateY(0px)' },
		{ transform: 'translateY(4px)' },
		{ transform: 'translateY(0px)' }
	], {
		duration: 2000,
		iterations: Infinity,
		easing: 'ease-in-out'
	});
}

export function renderLogo(container, options = {}) {
	const { variant = 'full', size = 'md', animated = false } = options;
	const sizePx = SIZE_MAP[size] || SIZE_MAP.md;
	container.innerHTML = VARIANTS[variant] ? VARIANTS[variant](sizePx) : VARIANTS.full(sizePx);
	// Apply brand color
	const icon = container.querySelector('.cw-logo-icon');
	if (icon) icon.style.color = BRAND_YELLOW;
	const compact = container.querySelector('.cw-logo-compact');
	if (compact) compact.style.color = BRAND_YELLOW;
	// Animate water drop if requested
	if (animated && icon) addBobbingAnimation(icon);
}
// Charity: Water Logo component
