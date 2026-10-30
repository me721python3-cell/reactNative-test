/**
 * Typed mock challenge data for the Lesson gameplay screen.
 * Per AGENTS.md: Never hardcode data in components; always map over typed mocks.
 */

export type ChallengeType = "SELECT" | "ASSIST";

export interface ChallengeOption {
  id: string;
  text: string;
  image: string;
  isCorrect: boolean;
  shortcut: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  question: string;
  correctSolution: string;
  options: ChallengeOption[];
}

export interface MockLessonData {
  id: string;
  title: string;
  hearts: number;
  maxHearts: number;
  percentage: number;
  challenge: Challenge;
}

export const mockLessonData: MockLessonData = {
  id: "u1-l4",
  title: "Essential Words",
  hearts: 5,
  maxHearts: 5,
  percentage: 0.35,
  challenge: {
    id: "ch-cat",
    type: "SELECT",
    question: "Which one of these is the 'cat'?",
    correctSolution: "el gato",
    options: [
      { id: "opt-1", text: "el gato", image: "🐱", isCorrect: true, shortcut: "1" },
      { id: "opt-2", text: "el perro", image: "🐶", isCorrect: false, shortcut: "2" },
      { id: "opt-3", text: "el pájaro", image: "🐦", isCorrect: false, shortcut: "3" },
      { id: "opt-4", text: "el pez", image: "🐟", isCorrect: false, shortcut: "4" },
    ],
  },
};
