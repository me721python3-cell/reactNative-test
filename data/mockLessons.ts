/**
 * Typed mock data for the Learn dashboard, modeled after a
 * courses → units → lessons structure (duolingo-clone style).
 * Replace with server data later; components must always map over this.
 */

export type LessonStatus = "completed" | "current" | "locked";

export interface MockLesson {
  id: string;
  title: string;
  status: LessonStatus;
}

export interface MockUnit {
  id: string;
  title: string;
  description: string;
  /** Tailwind-style color token key from constants/theme. */
  color: "primary" | "secondary" | "tertiary";
  lessons: MockLesson[];
}

export interface MockCourse {
  id: string;
  language: string;
  units: MockUnit[];
}

export const mockCourse: MockCourse = {
  id: "course-spanish",
  language: "Spanish",
  units: [
    {
      id: "unit-1",
      title: "Unit 1",
      description: "Learn the very basics",
      color: "primary",
      lessons: [
        { id: "u1-l1", title: "Greetings", status: "completed" },
        { id: "u1-l2", title: "Names & intro", status: "completed" },
        { id: "u1-l3", title: "Say hello", status: "current" },
        { id: "u1-l4", title: "Polite words", status: "locked" },
        { id: "u1-l5", title: "Goodbye", status: "locked" },
      ],
    },
    {
      id: "unit-2",
      title: "Unit 2",
      description: "Order food and drinks",
      color: "secondary",
      lessons: [
        { id: "u2-l1", title: "Café basics", status: "locked" },
        { id: "u2-l2", title: "Ordering", status: "locked" },
        { id: "u2-l3", title: "The bill", status: "locked" },
      ],
    },
    {
      id: "unit-3",
      title: "Unit 3",
      description: "Getting around the city",
      color: "tertiary",
      lessons: [
        { id: "u3-l1", title: "Directions", status: "locked" },
        { id: "u3-l2", title: "Transport", status: "locked" },
        { id: "u3-l3", title: "Landmarks", status: "locked" },
        { id: "u3-l4", title: "Asking for help", status: "locked" },
      ],
    },
  ],
};
