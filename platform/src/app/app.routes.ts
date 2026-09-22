import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'progress',
    loadComponent: () => import('./features/progress/progress').then(m => m.Progress),
  },
  {
    path: 'journey',
    loadComponent: () => import('./features/journey/journey').then(m => m.Journey),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills-catalog/skills-catalog').then(m => m.SkillsCatalog),
  },
  {
    path: 'skills/:slug',
    loadComponent: () =>
      import('./features/skills/skill-detail/skill-detail').then(m => m.SkillDetail),
  },
  {
    path: 'vacancies',
    loadComponent: () =>
      import('./features/vacancies/vacancy-list/vacancy-list').then(m => m.VacancyList),
  },
  {
    path: 'vacancies/:slug',
    loadComponent: () =>
      import('./features/vacancies/vacancy-detail/vacancy-detail').then(m => m.VacancyDetail),
  },
  {
    path: 'challenges',
    loadComponent: () =>
      import('./features/challenges/challenge-catalog/challenge-catalog').then(
        m => m.ChallengeCatalog
      ),
  },
  {
    path: 'challenges/:slug',
    loadComponent: () =>
      import('./features/challenges/challenge-detail/challenge-detail').then(
        m => m.ChallengeDetail
      ),
  },
  {
    path: 'study-plans',
    loadComponent: () =>
      import('./features/study-plans/study-plan-list/study-plan-list').then(
        m => m.StudyPlanList
      ),
  },
  {
    path: 'study-plans/:slug',
    loadComponent: () =>
      import('./features/study-plans/study-plan-detail/study-plan-detail').then(
        m => m.StudyPlanDetail
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
