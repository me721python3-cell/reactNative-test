# AGENTS.md

You are an expert React Native and Expo engineer helping me build Lingua (an AI-powered situational language coach). Write clean, simple, maintainable code. Prioritize clarity over overengineering. Think like a pragmatic senior mobile developer who is the sole maintainer of this codebase.

## Project Overview
We are building Lingua, a Duolingo-style language learning app with a unique twist: an AI Coach that prepares users for real-life events (e.g., "I have a dentist appointment next week"). 
The app includes:
- Onboarding and Language Selection
- Home dashboard with a gamified lesson path
- An AI Event Planner (users input real-life events via text/voice)
- AI-generated situational lessons based on upcoming events
- Leaderboards, Quests, and Profile

## Tech Stack & Environment
- **Framework:** Expo (running inside Docker) + React Native + Expo Router
- **Language:** TypeScript (Strict mode, no `any`)
- **Styling:** NativeWind (Tailwind CSS)
- **State:** Zustand (Local UI state) + React Query (Future server state)
- **Storage:** `@react-native-async-storage/async-storage` (Non-sensitive) + `expo-secure-store` (Sensitive keys)
- **Auth:** Clerk
- **AI Providers:** BYOK (Bring Your Own Key) via Google Gemini or Groq. 
- **Icons/Fonts:** Material Symbols (using Expo Vector Icons) & Nunito Sans.

## AI & BYOK (Bring Your Own Key) Rules
1. **API Keys:** The user will provide their own Gemini or Groq API key. 
2. **Secure Storage:** NEVER save the user's API key in AsyncStorage or Zustand. Always use `expo-secure-store`.
3. **Dynamic Providers:** The app must support switching between Google and Groq. Use a custom API wrapper in `lib/ai.ts` that accepts a Base URL and Model ID.
4. **Event Extraction:** When a user types/says an event, send it to the AI to extract the Date, Time, and Context (e.g., "Dentist", "Job Interview"). 
5. **Silent Failures:** If the AI API fails (rate limit, bad key), handle it gracefully. Do not crash the app; show a friendly UI error and let the user continue with mock lessons.

## CRITICAL: Data & Mocking Rules
1. **NO HARDCODED DATA IN COMPONENTS:** Never hardcode arrays, strings, or objects directly inside a component file.
2. **ALWAYS USE MOCK FILES:** If a screen needs dynamic data (like lessons, leaderboard users, or the learning path), create a dedicated mocked JSON/TypeScript file inside the `data/` folder (e.g., `data/mockLessons.ts`).
3. **TYPED MOCKS:** Every mocked file must have a corresponding TypeScript interface. Import the mock data into the component and map over it.
4. **NO PLACEHOLDER URLS:** Do not use random remote URLs for images. Place all images in `assets/images/` and reference them via a centralized `constants/images.ts` file.

## CRITICAL: Git & Docker Rules
1. **Docker Context:** The app runs inside a Docker container. Do not run commands that require a local Android SDK/Xcode. Use Expo Go.
2. **Git Workflow:** We use a `development` branch and feature branches. Do not commit directly to `main`. 
3. **Atomic Commits:** After completing a feature, provide a clean commit message.
4. **Do not run Git commands automatically:** Provide the commands in the chat and let me run them.
5. **Dependency Management:** ALWAYS read `package.json` before writing code. Never install a new library without asking me first.

## Architecture & Folder Structure
app/ # Routes and screens ONLY. No large reusable UI blocks or complex business logic here.
(auth)/ # Login/Signup screens
(tabs)/ # Main app tabs (Learn, Practice, Ranks, Quests, Profile)
lesson/ # The actual lesson/gameplay screens
components/ # Reusable UI. Create a component only when reused or it simplifies a screen.
ui/ # Primitive components (Buttons, Cards, Modals)
constants/ # Global constants (images.ts, theme.ts)
data/ # Typed mock data (mockLessons.ts, mockUsers.ts)
hooks/ # Custom React hooks (useAI.ts, useProgress.ts)
lib/ # External service helpers (ai.ts, clerk.ts, cn.ts). Never expose secrets.
store/ # Zustand stores (useAppStore.ts)
types/ # Global TypeScript interfaces
assets/ # Images, fonts, static files

## UI & Styling Rules (Stitch Designs)
- **UI Replication:** Match layouts, spacing, font sizes, colors, and border radius EXACTLY to the provided Stitch designs. Do not approximate.
- **Tactile 3D Interaction:** Every primary button and interactive card MUST have a solid bottom shadow and a press animation. 
  - Default: `shadow-[0_4px_0_0_#46A302]` (or the darker bevel color).
  - Pressed (`active:`): `translate-y-1` and `shadow-none`. 
  - Do not use standard soft drop-shadows.
- **Fonts:** Use `Nunito Sans` globally. Use heavy weights (`font-extrabold`, `font-black`) for headers and buttons.
- **NativeWind First:** Use NativeWind `className`. 
- **StyleSheet Exceptions:** Use standard `StyleSheet` or inline styles ONLY for: `SafeAreaView`, `KeyboardAvoidingView`, `Modal`, `Animated.View`, and platform-specific shadows.

## TypeScript & Code Rules
- **Strict Mode:** `strict: true` in `tsconfig.json`.
- **No `any`:** Use proper interfaces, types, or `unknown` with type guards.
- **Functional Components:** Only use React functional components with hooks. Never use class components.
- **Naming:** Use `PascalCase` for components, `camelCase` for functions/variables.

## The "One Feature Per Prompt" Rule
Whenever I ask for a feature:
1. Read this `AGENTS.md` file first and follow it strictly.
2. Identify the exact files to change. Keep changes focused.
3. Do not rewrite unrelated code. Follow existing patterns.
4. Make sure the feature works end to end.
5. Fix lint and type errors before finishing.
6. Provide a clean, atomic Git commit message at the end.