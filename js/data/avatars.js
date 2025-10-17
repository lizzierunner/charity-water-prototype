
export const avatars = [
	{
		id: 'water-mage',
		emoji: '🧙‍♂️',
		name: 'Water Mage',
		description: 'Master of aqua magic and wisdom'
	},
	{
		id: 'ocean-warrior',
		emoji: '🌊',
		name: 'Ocean Warrior',
		description: 'Protector of the seas'
	},
	{
		id: 'hydro-engineer',
		emoji: '👷‍♀️',
		name: 'Hydro Engineer',
		description: 'Builder of water systems'
	},
	{
		id: 'rain-shaman',
		emoji: '🌧️',
		name: 'Rain Shaman',
		description: 'Caller of the rains'
	},
	{
		id: 'aqua-scientist',
		emoji: '🔬',
		name: 'Aqua Scientist',
		description: 'Researcher of water solutions'
	},
	{
		id: 'tide-ranger',
		emoji: '🏄‍♂️',
		name: 'Tide Ranger',
		description: 'Explorer of water frontiers'
	},
	{
		id: 'bubble-guardian',
		emoji: '🫧',
		name: 'Bubble Guardian',
		description: 'Keeper of pure waters'
	},
	{
		id: 'wave-rider',
		emoji: '🏄‍♀️',
		name: 'Wave Rider',
		description: 'Surfer of change'
	}
];

export function getAvatarById(id) {
	return avatars.find(a => a.id === id) || null;
}

export function getAvatarEmoji(id) {
	const avatar = getAvatarById(id);
	return avatar ? avatar.emoji : '';
}

export function getAvatarName(id) {
	const avatar = getAvatarById(id);
	return avatar ? avatar.name : '';
}
