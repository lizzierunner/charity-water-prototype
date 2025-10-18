export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  xpReward: number;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "How many people worldwide lack access to clean drinking water?",
    options: [
      "771 million people",
      "500 million people",
      "1 billion people",
      "2 billion people"
    ],
    correctAnswerIndex: 0,
    xpReward: 100
  },
  {
    id: 2,
    question: "What percentage of the world's population lacks access to basic sanitation?",
    options: [
      "About 15%",
      "About 30%",
      "About 45%",
      "About 60%"
    ],
    correctAnswerIndex: 1,
    xpReward: 100
  },
  {
    id: 3,
    question: "How much time do women and children in developing countries spend collecting water each day?",
    options: [
      "30 minutes",
      "2 hours",
      "6 hours",
      "10 hours"
    ],
    correctAnswerIndex: 2,
    xpReward: 100
  },
  {
    id: 4,
    question: "What is the minimum amount of water needed per person per day for basic survival?",
    options: [
      "5 liters",
      "20 liters",
      "50 liters",
      "100 liters"
    ],
    correctAnswerIndex: 1,
    xpReward: 100
  },
  {
    id: 5,
    question: "Which region has the lowest access to clean water?",
    options: [
      "South Asia",
      "Sub-Saharan Africa",
      "Southeast Asia",
      "Latin America"
    ],
    correctAnswerIndex: 1,
    xpReward: 100
  },
  {
    id: 6,
    question: "How many children die every day due to water-related diseases?",
    options: [
      "Over 100",
      "Over 500",
      "Over 800",
      "Over 1,000"
    ],
    correctAnswerIndex: 2,
    xpReward: 100
  },
  {
    id: 7,
    question: "What percentage of all diseases in developing countries are water-related?",
    options: [
      "30%",
      "50%",
      "70%",
      "80%"
    ],
    correctAnswerIndex: 3,
    xpReward: 100
  },
  {
    id: 8,
    question: "On average, how far do people in developing countries walk to get water?",
    options: [
      "1 kilometer",
      "3.7 kilometers",
      "7 kilometers",
      "10 kilometers"
    ],
    correctAnswerIndex: 1,
    xpReward: 100
  },
  {
    id: 9,
    question: "When communities get access to clean water, school attendance increases by approximately:",
    options: [
      "10%",
      "25%",
      "45%",
      "60%"
    ],
    correctAnswerIndex: 2,
    xpReward: 100
  },
  {
    id: 10,
    question: "What is the primary goal of charity:water?",
    options: [
      "To reduce pollution in rivers",
      "To bring clean and safe drinking water to every person on the planet",
      "To build swimming pools in developing countries",
      "To promote water conservation in cities"
    ],
    correctAnswerIndex: 1,
    xpReward: 100
  }
];

export const impactStories = [
  {
    title: "Clean Water Changes Everything",
    story: "In rural Ethiopia, 14-year-old Selam used to walk 6 hours every day to collect water from a dirty pond. Now, with a new well in her village built by charity:water, she has clean water just 10 minutes from her home. She's back in school, pursuing her dream of becoming a teacher.",
    location: "Ethiopia, East Africa",
    icon: "🌍"
  },
  {
    title: "A Village Transformed",
    story: "The community of Kibera in Kenya received a new water system that serves over 1,000 families. Children no longer miss school to fetch water, and waterborne diseases have decreased by 70%. Small businesses are thriving with reliable access to clean water.",
    location: "Kenya, East Africa",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    title: "Dreams Come True",
    story: "Maria from Guatemala can now focus on her education instead of spending hours carrying heavy water containers. The clean water point near her home has given her back 4 hours every day. She dreams of becoming a doctor to help her community.",
    location: "Guatemala, Central America",
    icon: "👩‍🎓"
  }
];
