export type SkillCategory = 'computer-science' | 'frontend' | 'software-engineering';
export type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface SkillItem {
  slug: string;
  title: string;
  category: SkillCategory;
  contentPath: string;
  currentLevel: SkillLevel | null;
  targetLevel: SkillLevel | null;
  evidenceCount: number;
}

export interface ChallengeItem {
  slug: string;
  title: string;
  category: string;
  contentPath: string;
}

export interface VacancyItem {
  slug: string;
  title: string;
  company: string;
  contentPath: string;
  requirementsPath: string;
  interviewPrepPath: string;
}

export interface StudyPlanItem {
  slug: string;
  title: string;
  contentPath: string;
}

export interface LabItem {
  slug: string;
  title: string;
  description: string;
  stack: string;
  status: 'active' | 'foundation';
  vacancySlug?: string;
  skills: string[];
  contentPath: string;
  learningPath: string;
  exercisesPath: string;
  modules: LabModule[];
}

export interface LabModule {
  title: string;
  focus: string;
  status: 'implemented' | 'next';
}
