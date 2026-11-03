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

/**
 * Ordered list of lesson IDs to determine the next unlockable lesson.
 */
export const orderedLessonIds: string[] = [
  "u1-l1",
  "u1-l2",
  "u1-l3",
  "u1-l4",
  "u1-l5",
  "u2-l1",
  "u2-l2",
  "u2-l3",
  "u2-l4",
  "u2-l5",
  "u3-l1",
  "u3-l2",
  "u3-l3",
  "u3-l4",
  "u3-l5",
];

export function getNextLessonId(currentLessonId: string): string | undefined {
  const currentIndex = orderedLessonIds.indexOf(currentLessonId);
  if (currentIndex !== -1 && currentIndex + 1 < orderedLessonIds.length) {
    return orderedLessonIds[currentIndex + 1];
  }
  return undefined;
}

/**
 * Lesson challenge definitions mapped by lesson ID.
 */
export const mockLessonsById: Record<string, MockLessonData> = {
  "u1-l1": {
    id: "u1-l1",
    title: "Greetings",
    hearts: 5,
    maxHearts: 5,
    percentage: 0.2,
    challenge: {
      id: "ch-u1-l1",
      type: "SELECT",
      question: "Which one means 'Hello'?",
      correctSolution: "¡Hola!",
      options: [
        { id: "opt-1", text: "¡Hola!", image: "👋", isCorrect: true, shortcut: "1" },
        { id: "opt-2", text: "¡Adiós!", image: "🚶", isCorrect: false, shortcut: "2" },
        { id: "opt-3", text: "Por favor", image: "🙏", isCorrect: false, shortcut: "3" },
        { id: "opt-4", text: "Gracias", image: "✨", isCorrect: false, shortcut: "4" },
      ],
    },
  },
  "u1-l2": {
    id: "u1-l2",
    title: "Names & Introductions",
    hearts: 5,
    maxHearts: 5,
    percentage: 0.4,
    challenge: {
      id: "ch-u1-l2",
      type: "SELECT",
      question: "Which one means 'Good morning'?",
      correctSolution: "Buenos días",
      options: [
        { id: "opt-1", text: "Buenas noches", image: "🌙", isCorrect: false, shortcut: "1" },
        { id: "opt-2", text: "Buenos días", image: "🌅", isCorrect: true, shortcut: "2" },
        { id: "opt-3", text: "Hasta luego", image: "⏳", isCorrect: false, shortcut: "3" },
        { id: "opt-4", text: "Buenas tardes", image: "🌇", isCorrect: false, shortcut: "4" },
      ],
    },
  },
  "u1-l3": {
    id: "u1-l3",
    title: "Say Hello",
    hearts: 5,
    maxHearts: 5,
    percentage: 0.6,
    challenge: {
      id: "ch-u1-l3",
      type: "SELECT",
      question: "Which one means 'Goodbye'?",
      correctSolution: "¡Adiós!",
      options: [
        { id: "opt-1", text: "¡Hola!", image: "👋", isCorrect: false, shortcut: "1" },
        { id: "opt-2", text: "¡Adiós!", image: "👋", isCorrect: true, shortcut: "2" },
        { id: "opt-3", text: "Sí", image: "👍", isCorrect: false, shortcut: "3" },
        { id: "opt-4", text: "No", image: "👎", isCorrect: false, shortcut: "4" },
      ],
    },
  },
  "u1-l4": {
    id: "u1-l4",
    title: "Essential Words",
    hearts: 5,
    maxHearts: 5,
    percentage: 0.8,
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
  },
  "u1-l5": {
    id: "u1-l5",
    title: "Basic Courtesies",
    hearts: 5,
    maxHearts: 5,
    percentage: 1.0,
    challenge: {
      id: "ch-u1-l5",
      type: "SELECT",
      question: "Which one means 'Thank you'?",
      correctSolution: "Gracias",
      options: [
        { id: "opt-1", text: "De nada", image: "🤝", isCorrect: false, shortcut: "1" },
        { id: "opt-2", text: "Gracias", image: "🙏", isCorrect: true, shortcut: "2" },
        { id: "opt-3", text: "Perdón", image: "🙇", isCorrect: false, shortcut: "3" },
        { id: "opt-4", text: "Disculpe", image: "🙋", isCorrect: false, shortcut: "4" },
      ],
    },
  },
};

/**
 * Safe accessor that returns the specific lesson challenge, or undefined if not found.
 */
export function tryGetMockLessonById(lessonId: string): MockLessonData | undefined {
  return Object.prototype.hasOwnProperty.call(mockLessonsById, lessonId)
    ? mockLessonsById[lessonId]
    : undefined;
}

/**
 * Returns the specific lesson challenge for the given ID, or throws if not found.
 */
export function getMockLessonById(lessonId: string): MockLessonData {
  const lesson = tryGetMockLessonById(lessonId);
  if (!lesson) {
    throw new Error(`Lesson not found: ${lessonId}`);
  }
  return lesson;
}
