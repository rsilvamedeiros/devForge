export type SkillCategory = 'computer-science' | 'frontend' | 'software-engineering';

export interface SkillItem {
  slug: string;
  title: string;
  category: SkillCategory;
  contentPath: string;
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
