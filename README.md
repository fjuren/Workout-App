# Enduro – AI-Powered Strength Workouts for Endurance Athletes

**Enduro** is a full-stack fitness app designed to help **endurance athletes** (like cyclists and runners) integrate **smart, strength-focused workouts** into their training routine—without compromising endurance performance.  

Using AI, Enduro generates personalized workouts based on user goals, fitness levels, and available equipment. Built with **Node.js**, **Express**, **React Native**, and **Supabase**, it’s designed for flexibility, intelligent recommendations, and real-world usability.

---

## Features

* **AI-Powered Workout Generation**  
  Generate personalized **single-day** or **multi-day** workout plans based on your preferences:
  * Workout **focus**, **type**, **skill level**, **intensity**, and **duration**
  * Automatically includes **warm-up and main sessions**
  * Optimized for endurance athletes to balance gym training and endurance performance

* **User Profile Customization**  
  * Choose **metric** or **imperial** units  
  * Define **preferred and available equipment**  
  * Input **1RM (one-rep max)** values for accurate scaling  
  * Set **training goals** and **constraints** for personalized AI output  

* **Workout Management**  
  * Generate, save, and retrieve previous quick workouts  
  * Accept or reject generated workouts  
  * Mark workouts as complete  

* **User Authentication**  
  * **Signup**, **login**, **reset password**, and **email verification** via Supabase authentication  

* **MVP Status**  
  * Fully supports **single (quick) workouts**  
  * **Multi-day workout plans** in development  
  * Future features will include adaptive adjustments for:
    * Illness or injury
    * Travel
    * Upcoming events or competitions  
  * Dashboard view for progress tracking coming soon

---

## API Endpoints

### AI Workout Generation

| Method | Route | Description | Auth Required |
|--------|--------|--------------|---------------|
| POST | `/api/ai-plans/generate-workout/single` | Generate a single workout using OpenAI with specified parameters | ✅ |

### User Profile

| Method | Route | Description | Auth Required |
|--------|--------|--------------|---------------|
| POST | `/api/user/profile-settings` | Save or update user profile settings | ✅ |

### Workouts

| Method | Route | Description | Auth Required |
|--------|--------|--------------|---------------|
| GET | `/api/workouts/quick-workouts` | Retrieve all quick (single-day) workouts for the authenticated user | ✅ |
| GET | `/api/workouts/quick-workout-exercise` | Retrieve specific workout exercise details | ✅ |
| POST | `/api/workouts/accept-workout` | Accept and create one or more generated workouts | ✅ |
| POST | `/api/workouts/complete-workout` | Mark a workout as completed | ✅ |

---

## Technologies Used

**Backend**  
* Node.js  
* Express  

**Frontend**  
* Expo Go  
* React Native  
* React Native Paper  
* TypeScript  

**Database & Auth**  
* Supabase (PostgreSQL + Auth service)

**Testing**  
* Jest  
* Jest-Expo  
* Supertest  
* Testing Library (React Native)

**3rd Party APIs**  
* OpenAI API (for AI-generated workout plans)

---

## Installation Instructions

### 1. Clone the repository

```bash
git https://github.com/fjuren/Workout-App.git
cd Workout-App
```

### 2. Install dependencies

From the **project root**, run:

```bash
npm install
```

> Installing from the root will cascade and install dependencies for both the **mobile** and **server** folders.

### 3. Set up environment variables

Create the following `.env` files in their respective directories.

---

### Backend (`/server/.env.example`)

```env
NODE_ENV=development
PORT=5000
OPENAI_API_KEY=examplekey
SUPABASE_URL=your_supabase_url_here
SUPABASE_SECRET_KEY=your_supabase_secret_key_here
ALLOWED_ORIGINS=http://localhost:19000,http://localhost:8081
```

---

### Frontend (`/mobile/.env.example`)

```env
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
EXPO_PUBLIC_USE_MOCK_DATA=false
```

> Set `EXPO_PUBLIC_USE_MOCK_DATA=true` if you want to run the app in offline/mock mode.

---

### 4. Start the application

From the **root directory**, run:

```bash
npm run dev
```

This command will start both the **mobile (Expo)** and **server (Express)** processes.  

Once running, you can access the app in development mode at:
```
http://localhost:8081/
```

---

## Usage

1. Launch the app through **Expo Go**
2. **Sign up** or **log in** using Supabase authentication
3. Set up your **profile preferences**:
   * Unit system (metric/imperial)
   * Available equipment
   * Goals and 1RM values
4. Generate a **single-day AI-powered workout**
5. Review your workout, complete it, or save it
6. (Coming soon) Generate **multi-day training plans** and access your **dashboard**

---

## Testing

To run all tests (for both mobile and server):

```bash
npm run test
```

This command will automatically run Jest test suites across the entire project.  
All tests should pass successfully before deployment.

---

## Future Improvements

* **Multi-Day AI Training Plans** — Generate structured programs over weeks or months  
* **Adaptive Planning** — Adjusts training based on rest, travel, illness, and event data  
* **Dashboard & Insights** — Track progress, completion rates, and workout metrics  
* **Exercise Guidance** — Add movement cues, demo videos, and AI-assisted form feedback  
* **Social Features** — Share training progress and connect with teammates or coaches  
* **Custom Workouts** — Allow users to manually create and save their own workouts (for those who prefer full control over training design)  


