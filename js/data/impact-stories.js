
export const impactStories = [
	{
		title: "Clean Water Transforms Ethiopian Community",
		location: "Tigray, Ethiopia",
		icon: "🌊",
		paragraphs: [
			"In the Tigray region, women and children used to walk 3 hours daily to collect water from a contaminated source.",
			"charity: water funded a deep borehole well in 2019, bringing clean water to 2,500 people for the first time.",
			"School attendance increased 40% as children no longer spent their days fetching water. Disease rates dropped dramatically.",
			"The community now thrives with a vegetable garden and small businesses, all powered by access to clean water."
		],
		metrics: {
			peopleServed: 2500,
			costPerPerson: 38,
			completionDate: "March 2019"
		}
	},
	{
		title: "India Village Gets First-Ever Tap Water",
		location: "Bihar, India",
		icon: "💧",
		paragraphs: [
			"For generations, this rural village relied on a polluted pond that caused constant illness.",
			"A charity: water piped water project installed taps directly in homes for 1,800 residents.",
			"Women reported saving 6 hours per day, which they now use for education and income generation.",
			"Child mortality rates have fallen, and the village economy has grown with new opportunities."
		],
		metrics: {
			peopleServed: 1800,
			costPerPerson: 45,
			completionDate: "July 2021"
		}
	},
	{
		title: "Uganda School Transforms with Clean Water",
		location: "Mbale, Uganda",
		icon: "✨",
		paragraphs: [
			"Students at this primary school were getting sick from dirty water, causing frequent absences.",
			"charity: water installed a rainwater harvesting system and biosand filters in 2020.",
			"Attendance improved 65% and test scores rose significantly as students stayed healthy.",
			"The school now serves 450 students with clean, safe drinking water every day."
		],
		metrics: {
			peopleServed: 450,
			costPerPerson: 32,
			completionDate: "September 2020"
		}
	}
];

export function getStoryByIndex(index) {
	return impactStories[index] || null;
}
