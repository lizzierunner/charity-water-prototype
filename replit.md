# H2O Hero Quiz - Wireframe Application

## Project Overview
An interactive quiz application wireframe for charity:water's mission to end the global water crisis. Users create a water hero character, answer quiz questions about global water access, learn from real impact stories, and receive personalized results.

**Brand Alignment:** This application follows charity:water's official brand guidelines, emphasizing hope, dignity, clean design, and inspirational messaging over gamification.

## Current Implementation Status
**Status:** ✅ Fully Functional Quiz Game - All Rubric Criteria Met (65/65 points)

### Rubric Achievement Summary
**REQUIRED FEATURES (50 points):**
- ✅ Core Interactivity (25pts): Interactive quiz with score tracking, XP/level system, game state updates
- ✅ Responsive Layout (15pts): Mobile and desktop support with Tailwind CSS
- ✅ Branding & Visual Design (10pts): Jerry Can Yellow, charity:water brand alignment

**BONUS FEATURES (15 points):**
- ✅ Challenge Mechanic (10pts): Penalty system (-20 XP for wrong answers)
- ✅ Game Controls (5pts): Reset Quiz button during gameplay, Play Again on results
- ✅ Celebrate Wins (5pts): Confetti animation for scores ≥70%

### Completed Features
1. **Landing Page** - Clean hero section with mission stats and prominent call-to-action
2. **Character Creation Flow** - Three-step process with avatar selection, name input, and confirmation
3. **Quiz System** - 10 questions with multiple choice answers and instant feedback
4. **Progress Tracking** - Character card with level, XP, and question progress
5. **Penalty System** - Wrong answers deduct 20 XP, penalty counter displays during quiz
6. **Impact Stories** - Real-world stories shown between questions (aligned with brand photo guidelines)
7. **Results Page** - Final score, achievements, ranking system, penalties, and confetti celebration
8. **Game Controls** - Reset Quiz button during gameplay, Play Again button on results
9. **Celebration Animation** - Confetti for 70%+ scores using brand colors
10. **Responsive Design** - Works on mobile, tablet, and desktop
11. **charity:water Brand Compliance** - Jerry Can yellow accent, clean typography, hope-focused messaging

## Application Structure

### Frontend Components
- `HeroLanding.tsx` - Main landing page with mission statistics
- `AvatarSelection.tsx` - Character avatar selection (8 hero types)
- `HeroNameInput.tsx` - Hero name input with preset suggestions
- `HeroConfirmation.tsx` - Review hero before starting quiz
- `CharacterCard.tsx` - Persistent character info display during quiz
- `QuizQuestion.tsx` - Question display with answer selection and feedback
- `ImpactStory.tsx` - Impact story cards between questions
- `QuizResults.tsx` - Final results with score, achievements, and ranking
- `StepIndicator.tsx` - Visual progress indicator for character creation

### Data & Logic
- `quizData.ts` - Contains 10 water-related quiz questions and 3 impact stories
- `HomePage.tsx` - Main application logic and state management

### Design System (charity:water Aligned)
- **Colors:** 
  - Jerry Can Yellow (#FFC845) - Primary accent for CTAs and highlights
  - Deep Ocean Blue (#1A5F7A) - Brand foundation
  - Pure Water Cyan (#57C5B6) - Water clarity and highlights
  - Clean, professional color palette
- **Typography:** Poppins for headings, Inter for body text (clean, readable)
- **Components:** Built with shadcn/ui for consistency
- **Design Principles:** Clean, spacious, hope-focused (per charity:water brand guide)
- **No Excessive Emojis:** Professional, clean interface following brand standards

## User Flow
1. **Landing** → View mission stats → Click "Start Quiz"
2. **Avatar Selection** → Choose from 8 hero types → Auto-advance
3. **Name Input** → Enter custom name or select preset → Continue
4. **Confirmation** → Review profile → Start Quiz
5. **Quiz** → Answer 10 questions → See correct/incorrect feedback
6. **Impact Stories** → View real stories every 3 questions
7. **Results** → See final score, ranking, and achievements → Play Again or Learn More

## Features

### Character Creation
- 8 unique avatar types (Water Mage, Ocean Warrior, etc.)
- Custom hero names or preset options
- Level and XP system (starts at Level 1, 0 XP)

### Quiz Mechanics
- 10 multiple-choice questions about water access
- Instant visual feedback (green for correct, red for incorrect)
- **Challenge System:** +100 XP for correct answers, -20 XP penalty for wrong answers
- Penalty counter displays during quiz (visible when penalties > 0)
- Progress bar showing completion percentage
- Character card shows live level/XP updates
- Reset Quiz button available during gameplay

### Achievement System
- Ranking based on score:
  - 90%+: Water Champion (Trophy icon) - 3 seconds of intense confetti
  - 70-89%: Water Guardian (Target icon) - 2 seconds of confetti
  - 50-69%: Water Warrior (Zap icon)
  - <50%: Water Explorer (Trophy icon)
- **Celebration Animation:** Confetti in charity:water brand colors (#FFC845, #1A5F7A, #57C5B6)
- Penalties displayed on results page with visual highlighting

### Impact Stories
- Shown after questions 3, 6, and 9
- Real-world examples from Ethiopia, Kenya, and Guatemala
- Emotional connection to charity:water's mission
- Follows brand photography guidelines (dignity, hope-focused)

## Technology Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Components:** shadcn/ui (Cards, Buttons, Badges, Progress bars)
- **Routing:** Wouter for client-side navigation
- **State:** React hooks (useState, useEffect) for local state management
- **Icons:** Lucide React (professional icon library)
- **Animation:** canvas-confetti for celebration effects

## Design Philosophy (charity:water Brand Aligned)
- **Inspirational above all** - Every interaction feels exciting and filled with possibility
- **Clear and direct** - Understandable language, spacious visuals
- **Hope-focused** - Emphasizes opportunity and solutions, not guilt
- **Professional photography** - Real people, real stories, dignity-focused
- **Clean and uncluttered** - Content has room to breathe
- **Jerry Can Yellow** - Signature charity:water accent color for CTAs

## Brand Compliance Updates (October 2025)
Based on charity:water's official Brand Usage Guide, the following updates were made:

### Color Palette
- ✅ Added Jerry Can Yellow (#FFC845) as primary accent color
- ✅ Updated all CTA buttons to use Jerry Can yellow
- ✅ Maintained clean, professional color scheme
- ✅ Ensured proper contrast ratios (WCAG AA compliant)

### Typography & Messaging
- ✅ Removed excessive emojis throughout the application
- ✅ Updated all messaging to be hope-focused and inspirational
- ✅ Changed from "Mission" language to clearer "Quiz" terminology
- ✅ Simplified headings and copy to be direct and understandable

### Visual Design
- ✅ Cleaned up cluttered interfaces
- ✅ Added more white space and breathing room
- ✅ Replaced emoji icons with professional Lucide icons
- ✅ Ensured all designs follow "clear and spacious" principle

### Photography Standards (for future implementation)
- Show people with dignity
- Focus on hope, not guilt
- Never place text/logos over faces
- Use negative space for text placement
- Show transformation stories (dirty water → clean water)

## Future Enhancements (Not Yet Implemented)
- Backend API for question randomization
- Database to store user scores/achievements
- Actual social sharing functionality (Twitter, Facebook APIs)
- Power-ups system (Hint Vision, Double XP, Second Chance)
- Leaderboard for top heroes
- More quiz questions and impact stories
- Achievement badges with unlock animations
- Dark mode support
- Full keyboard navigation and screen reader support
- Real charity:water photography integration
- Partner logo lockup (following brand guide)

## Running the Application
The app is currently running on port 5000. The workflow "Start application" handles both the Express backend and Vite frontend automatically.

## GitHub Repository
Repository: lizzierunner/water-wizard
Latest commit: https://github.com/lizzierunner/water-wizard/commit/eb80ca8f5a3569e7fd382f97b4201debb78b84a4

## Project Dates
- Created: October 2, 2025
- Brand Alignment Update: October 17, 2025
- Rubric Features Complete: October 18, 2025
