export interface FormData {
  grade: string;
  subject: string;
  topic: string;
  duration: number;
  objectives: string[];
  standards: string[];
  materials: string[];
  technology: string[];
  specialNeeds: string;
  languageLevel: string;
  assessmentType: string;
  customInstructions: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: string;
  subject: string;
  topic: string;
  duration: number;
  date: string;
  standard: string;
  learningObjectives: string[];
  essentialQuestion: string;
  materials: string[];
  technology: string[];
  vocabulary: string[];
  differentiation: {
    forStruggling: string[];
    forAdvanced: string[];
    forELL: string[];
  };
  procedure: {
    time: string;
    activity: string;
    teacherActions: string;
    studentActions: string;
  }[];
  assessment: {
    formative: string[];
    summative: string;
    rubrics: string[];
  };
  homework: string;
  extensions: string[];
  crossCurricular: string[];
  teacherNotes: string;
}
