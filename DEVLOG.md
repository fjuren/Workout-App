# Enduro Dev Log

**Duration:** September 15 – October 24, 2025  
**Developer:** Fabian Juren  
**Project:** *Enduro – AI-Powered Strength Workouts for Endurance Athletes*  

---

## Project Overview

**Enduro** is a full-stack fitness app designed to help **endurance athletes** (cyclists, runners, etc.) integrate **smart, strength-focused workouts** into their training — without compromising endurance performance.  

The app uses **AI (OpenAI API)** to generate customized workouts based on user preferences, training goals, and available equipment. Built as a **monorepo** with **Node.js + Express** for the backend and **React Native (Expo)** for the frontend, it leverages **Supabase** for database and authentication.

The project evolved from a front-end prototype using mock data to a fully functional full-stack MVP with database integration, authentication, and AI-driven content generation.

---

## Week-by-Week Development Log

### Week 1 (Sept 15–21): Front-End Prototype & Context Experimentation

**Focus:**  
- Built the initial front-end quickly using mock data to meet an early internal deadline.  
- Practiced React Context for global state management.

**Progress:**  
- Functional UI to simulate workout generation.  
- Basic global state set up with Context.

**Challenges:**  
- Used Context for data persistence — later realized this was a misuse since it reset on reload.  
- Refactoring would be needed once the backend was built.

**Learnings:**  
- Context should be used for *temporary global UI state*, not persisted user or workout data.  
- Early prototyping is helpful, but it’s important to plan for how state and data will persist.

---

### Week 2 (Sept 22–28): Backend Foundation & API Integration

**Focus:**  
- Built backend with Express + Supabase.  
- Replaced mock data with API endpoints and real database calls.

**Progress:**  
- Set up Supabase tables for users and workouts.  
- Created basic Express routes for workout generation and retrieval.

**Challenges:**  
- Significant rework needed to replace Context logic.  
- Learning curve understanding Supabase’s auth and query methods.

**Learnings:**  
- Proper architecture (route → controller → service → DB) improves maintainability.  
- Supabase’s simplicity and integrated auth system make it a strong alternative to Firebase.

---

### Week 3 (Sept 29–Oct 5): OpenAI Integration

**Focus:**  
- Integrated OpenAI API to dynamically generate workout content.  
- Experimented with different models and prompt strategies.

**Progress:**  
- Designed flexible prompt that takes user parameters:  
  * Focus, type, skill, intensity, duration, goals, constraints.  
- Established AI service within backend.

**Challenges:**  
- Learned how OpenAI’s token system affects pricing and speed.  
- Needed to balance prompt detail with cost and output quality.

**Learnings:**  
- Short, structured prompts perform best.  
- Model selection (e.g. gpt-4o-mini) offers balance between quality and cost.

**Example Prompt:**
```ts
Generate a single ${duration}-minute ${type} workout focused on ${focus}.
Skill: ${skill}. Intensity: ${intensity}.
Equipment: ${equipment.join(', ') || 'bodyweight only'}.
Goals: ${goals.join(', ') || 'general fitness'}.
${constraints.length ? `Constraints: ${constraints.join(', ')}` : ''}
${notes ? `Notes: ${notes}` : ''}
```

---

### Week 4 (Oct 6–12): AI Performance & UX Enhancements

**Focus:**  
- Addressed slow AI responses (20–30s).  
- Improved user feedback and error handling in the frontend.

**Progress:**  
- Added loading indicators and error boundaries.  
- Started planning ways to optimize AI latency (e.g. streaming or caching).

**Challenges:**  
- Delays affected UX; needed clearer communication that AI was still processing.

**Learnings:**  
- Performance issues are tolerable if the UI keeps users informed.  
- Future optimization may include request batching or result caching.

---

### Week 5 (Oct 13–19): Database Modeling & Schema Improvements

**Focus:**  
- Refined data models and relationships in Supabase.  
- Introduced JSONB columns for storing flexible workout structures.

**Progress:**  
- Added new tables for saved workouts, completed sessions, and user metadata.  
- Created SQL scripts for testing schema updates.

**Challenges:**  
- Understanding indexing and how to optimize query performance.  
- Keeping schema aligned with evolving business logic.

**Learnings:**  
- JSONB fields allow flexibility for AI-generated, semi-structured data.  
- Database design benefits from anticipating future query needs.

---

### Week 6 (Oct 20–24): Testing, Error Handling, and Technical Refinement

**Focus:**  
- Improved backend error consistency and added unit test scaffolding.  
- Reviewed architectural consistency across routes, controllers, and services.

**Progress:**  
- Defined a unified error structure with standardized HTTP responses.  
- Set up Jest and Supertest for backend routes; began testing-library setup for frontend.

**Challenges:**  
- TypeScript types occasionally mismatched between layers.  
- Some refactoring needed for better testability.

**Learnings:**  
- A consistent error structure simplifies debugging across frontend and backend.  
- Type safety enforces better contract discipline between API layers.

---

## Key Challenges and Solutions

| **Challenge** | **Solution / Outcome** |
|----------------|------------------------|
| Used React Context for persistent state | Refactored to use Supabase and REST API for real persistence |
| Slow OpenAI responses (20–30s) | Added UX loading indicators; planning streaming and caching |
| Supabase learning curve | Understood logs, API design, and auth workflows; found it developer-friendly |
| Architectural rework | Established clean separation: routes → controllers → services |
| Managing feature bloat and refactor needs | Learned the value of periodic cleanups before adding new features |

---

## Additional Learnings

### Monorepo Structure
Learned how to structure a monorepo with a shared root `package.json`, cascading scripts, and local dependencies for both frontend and backend.

### Supabase Logging and Operations
Explored Supabase’s dashboard tools for logging queries and inspecting auth events, improving observability.

### Code Quality & Refactoring Discipline
Realized how quickly technical debt builds up when features are rushed. It’s critical to pause for refactoring to avoid compounding maintenance issues — especially under external pressure to ship features.

### Mock Data & Constants
Using mock data and constants helped rapidly prototype UIs before the backend was ready — a valuable pattern for decoupled development.

### API Architecture Best Practices
Practiced separating layers into **routes → controllers → services**, improving readability, maintainability, and testability.

---

## Key Learnings and Insights

- Don’t use Context for data persistence — use a backend early.  
- Strong typing across backend and frontend improves reliability.  
- Prompt design significantly impacts AI output quality and cost.  
- Refactoring regularly prevents burnout and feature bloat.  
- Good architecture and error handling lead to faster debugging.  
- Testing early increases long-term velocity even if it slows you down initially.

---

## Next Steps / Future Improvements

### AI & Performance
- Implement multi-day AI-generated training plans (extend single-day logic).  
- Add adaptive AI that adjusts based on user data (rest, travel, illness, events).  
- Introduce caching or response streaming to improve API latency.  
- Explore OpenAI function calling for structured outputs.

### UX & Frontend
- Build dashboard & progress tracking UI.  
- Add exercise guidance: technique tips, demo videos, and AI feedback.  
- Design offline mode for use without an internet connection.  
- Expand custom workout creation for manual planning.

### Backend & Infrastructure
- Learn and implement database indexing for JSONB and relational tables.  
- Integrate testing coverage reports and CI/CD for automated validation.  
- Add error logging and monitoring (e.g., Sentry or Supabase logs).  
- Continue practicing TypeScript for stricter type safety.

### Product & Collaboration
- Prepare for real-world scalability: versioned APIs, rate limiting, caching layers.  
- Balance rapid feature delivery with technical debt management.  
- Plan for future social and team-based features.

---

## Closing Reflection

This project has been a valuable learning journey — not just technically, but in developing good engineering judgment.  

The transition from a quick front-end prototype to a structured full-stack application reinforced the importance of **proper architecture, testing discipline, and thoughtful iteration**.  

**Enduro** now serves as both a functioning MVP and a strong foundation for future development and experimentation.
