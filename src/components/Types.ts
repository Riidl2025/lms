
export type InstituteCode = string;

export interface User {
  id: string;
  name: string;
  email: string;
  instituteCode: InstituteCode;
  ipAddress?: string;
  location?: { lat: number; lng: number };
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lecture {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  quiz: MCQ[];
}

export interface Module {
  id: string;
  name: string;
  lectures: Lecture[];
}

export interface Progress {
  unlockedLectures: string[];
  completedLectures: string[];
}
