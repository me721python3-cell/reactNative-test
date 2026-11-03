/**
 * Typed mock data for the Learn path with units and lessons.
 * Per AGENTS.md: Never hardcode data in components; always map over typed mocks.
 */

export type LessonStatus = "completed" | "active" | "locked";

export interface Lesson {
  id: string;
  title: string;
  status: LessonStatus;
}

export type EnrichedLesson = Lesson & {
  currentIndex: number;
};

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  themeColor: string;
  shadowColor: string;
  lessons: Lesson[];
}

export const mockUnits: Unit[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "Unit 1: Basics",
    description: "Learn the very basics of your new language",
    themeColor: "#58cc02",
    shadowColor: "#46a302",
    lessons: [
      { id: "u1-l1", title: "Greetings", status: "completed" },
      { id: "u1-l2", title: "Names & Introductions", status: "completed" },
      { id: "u1-l3", title: "Say Hello", status: "completed" },
      { id: "u1-l4", title: "Essential Words", status: "active" },
      { id: "u1-l5", title: "Basic Courtesies", status: "locked" },
    ],
  },
  {
    id: "unit-2",
    unitNumber: 2,
    title: "Unit 2: Phrases",
    description: "Common phrases, asking questions & directions",
    themeColor: "#1cb0f6",
    shadowColor: "#1899d6",
    lessons: [
      { id: "u2-l1", title: "Simple Questions", status: "locked" },
      { id: "u2-l2", title: "Where & When", status: "locked" },
      { id: "u2-l3", title: "Directions & Transit", status: "locked" },
      { id: "u2-l4", title: "Numbers & Counting", status: "locked" },
      { id: "u2-l5", title: "Around Town", status: "locked" },
    ],
  },
  {
    id: "unit-3",
    unitNumber: 3,
    title: "Unit 3: Daily Life",
    description: "Order food, drinks, café culture & dining out",
    themeColor: "#ff9600",
    shadowColor: "#e08500",
    lessons: [
      { id: "u3-l1", title: "Café Basics", status: "locked" },
      { id: "u3-l2", title: "Ordering Food", status: "locked" },
      { id: "u3-l3", title: "At the Restaurant", status: "locked" },
      { id: "u3-l4", title: "Paying the Bill", status: "locked" },
      { id: "u3-l5", title: "Food Preferences", status: "locked" },
    ],
  },
];
