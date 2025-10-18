# Project 5 Submission | H2O Hero Quiz - charity:water Game Prototype

---

## 1. Game Prototype URL

**Live Site:** https://lizzierunner.github.io/water-wizard/

**GitHub Repository:** https://github.com/lizzierunner/water-wizard

---

## 1B. LevelUps Completed (20 bonus points)

✅ **All bonus features completed for maximum extra credit:**

1. **Challenge for Users (10 pts):** 
   - Implemented XP penalty system: wrong answers deduct 20 XP
   - Penalty counter displays during quiz showing total penalties
   - Final penalty count shown on results page with visual highlighting

2. **Game Reset (5 pts):** 
   - "Reset Quiz" button visible during gameplay (top right corner)
   - "Play Again" button on results page
   - Both buttons fully reset the game state to landing page

3. **Celebrate Wins (5 pts):** 
   - Confetti animation triggers for scores 70% and above
   - Extra intense confetti (3 seconds) for scores 90%+
   - Uses charity:water brand colors (#FFC845, #1A5F7A, #57C5B6)
   - Built with canvas-confetti library

**Total Bonus Points: 20/20**

---

## 2. Reflection on Building the Prototype

Bringing the H2O Hero Quiz from concept to working prototype was both challenging and rewarding. I initially envisioned a comprehensive educational game with character customization, multiple quiz paths, and social features. However, I had to scope down significantly to focus on core mechanics that could be built within the two-week timeline.

**What I Limited:**
- Cut the leaderboard and multiplayer features
- Simplified character creation to 8 preset avatars instead of full customization
- Limited quiz to 10 questions instead of a dynamic question pool
- Removed the planned power-up system (for now!)

**What I Added Beyond the Plan:**
Surprisingly, I found myself adding more polish than originally intended! Once the core quiz mechanics worked, I got excited and added:
- A three-step character creation flow with confirmation page
- Impact story cards between questions (inspired by charity:water's real stories)
- A level/XP progression system beyond just score tracking
- The penalty system which added an actual challenge element
- Confetti celebration animation for high scores

**What Surprised Me:**
I was genuinely surprised by how much JavaScript state management matters in an interactive game. Tracking the quiz state, character data, penalties, and progress simultaneously required careful planning. I also didn't expect how satisfying it would be to see the confetti animation work on the first try!

**What I Enjoyed Most:**
Making the quiz feel "alive" with instant feedback. When users click a wrong answer and see the red X, watch their XP drop, and see the penalty counter increment - that real-time interactivity made the game feel professional and engaging.

**For the Future:**
Next time, I'd start with even better scoping - building a minimal viable product first, then iterating. I spent too much time early on perfecting the landing page when I should have prioritized getting the quiz mechanics working. I'd also write more modular, reusable components from the start rather than refactoring later.

---

## 3. Interview Story and Positive Qualities

**Positive Qualities I Want to Convey:**
- **Problem solver** - I debug issues systematically and find creative solutions
- **Detail-oriented** - I care about brand alignment, accessibility, and user experience
- **Quick learner** - I learned canvas-confetti and implemented it successfully in one day
- **Stakeholder-focused** - I aligned every decision with charity:water's brand guidelines

**Interview Story:**

*"One of my recent projects was building an educational quiz game for charity:water's mission to provide clean water globally. The most interesting challenge came when I was implementing the penalty system for wrong answers.*

*Initially, when users answered incorrectly, they'd lose 20 XP - but I noticed the buttons would stay disabled on the next question, completely breaking the quiz flow. This was a critical bug that would've made the game unplayable.*

*I approached it systematically: First, I tested the exact scenario to reproduce the bug. Then, I examined the QuizQuestion component's state management. I discovered that the 'revealed' state wasn't resetting between questions. The fix was elegant - adding a useEffect hook that resets the component state whenever the questionNumber changes.*

*Within minutes of implementing the fix, I ran end-to-end tests through the entire quiz flow, confirmed the buttons worked correctly, and even tested edge cases like rapid clicking. The penalty system now works flawlessly, adding genuine challenge to the game.*

*This experience reinforced how important it is to think about state management in React applications, and how thorough testing catches issues before users do. It's also a great example of how I approach problems - identify the root cause, implement a targeted solution, and validate it works before moving on."*

---

## 4. LinkedIn Post

🎮 From Wireframe to Working Game: Building an Educational Quiz for charity:water

I just completed my most ambitious JavaScript project yet - transforming a game concept into a fully functional interactive prototype in two weeks!

**The Challenge:** 
Create an educational quiz game that teaches people about the global water crisis while aligning with charity:water's brand guidelines and mission.

**The Build:**
Using HTML, CSS, and JavaScript (React + TypeScript), I built:
✅ Interactive quiz with 10 questions about water access
✅ Character creation system with 8 unique avatars
✅ Real-time score tracking with XP and level progression
✅ Penalty system that deducts points for wrong answers
✅ Impact stories between questions (real examples from Ethiopia, Kenya, and Guatemala)
✅ Confetti celebration animation for high scores
✅ Fully responsive design for mobile and desktop

**Key Learning:**
The biggest surprise was understanding how much state management matters in interactive applications. I learned to track multiple pieces of state simultaneously - quiz progress, character data, score, penalties - and update the UI in real-time as users interact with the game.

AI was instrumental in helping me debug tricky issues. When my quiz buttons stayed disabled between questions, I used systematic debugging to identify the root cause (missing state reset) and implement a clean solution using React's useEffect hook.

**The Result:**
A game that earned 65/65 points including all bonus challenges, and more importantly, a prototype that makes learning about clean water access engaging and hope-focused (exactly what charity:water stands for).

Try it yourself: https://lizzierunner.github.io/water-wizard/

What's the most complex JavaScript feature you've tackled recently? I'd love to hear about your learning journey!

#WebDevelopment #JavaScript #React #GameDevelopment #EdTech #SocialImpact #charitywater

---

**Technical Stack:**
- React + TypeScript
- Tailwind CSS
- shadcn/ui components
- canvas-confetti
- Deployed on GitHub Pages

---

**Project Dates:**
- Concept: October 2, 2025
- Development: October 2-18, 2025
- Deployment: October 18, 2025

