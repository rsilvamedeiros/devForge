import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview').then(m => m.Overview),
  },
  {
    path: 'learning',
    loadComponent: () => import('./features/learning/learning').then(m => m.Learning),
  },
  {
    path: 'documentation',
    loadComponent: () => import('./features/documentation/documentation').then(m => m.Documentation),
  },
  {
    path: 'curriculum',
    loadComponent: () => import('./features/curriculum/curriculum').then(m => m.Curriculum),
  },
  {
    path: 'reference',
    loadComponent: () => import('./features/api-reference/api-reference').then(m => m.ApiReference),
  },
  {
    path: 'architecture',
    loadComponent: () => import('./features/architecture-guide/architecture-guide').then(m => m.ArchitectureGuide),
  },
  {
    path: 'components',
    loadComponent: () => import('./features/component-catalog/component-catalog').then(m => m.ComponentCatalog),
  },
  {
    path: 'examples',
    loadComponent: () => import('./features/examples/examples').then(m => m.Examples),
  },
  {
    path: 'coding-arena',
    loadComponent: () => import('./features/coding-arena/coding-arena').then(m => m.CodingArena),
  },
  {
    path: 'capstone',
    loadComponent: () => import('./features/capstone-project/capstone-project').then(m => m.CapstoneProject),
  },
  {
    path: 'sandbox',
    loadComponent: () => import('./features/angular-sandbox/angular-sandbox').then(m => m.AngularSandbox),
  },
  {
    path: 'e2e-quality',
    loadComponent: () => import('./features/e2e-quality/e2e-quality').then(m => m.E2eQuality),
  },
  {
    path: 'assessments',
    loadComponent: () => import('./features/assessments/assessments').then(m => m.Assessments),
  },
  {
    path: 'technical-tests',
    loadComponent: () => import('./features/technical-assessments/technical-tests').then(m => m.TechnicalTests),
  },
  {
    path: 'technical-qa',
    loadComponent: () => import('./features/knowledge-center/technical-qa').then(m => m.TechnicalQa),
  },
  {
    path: 'quick-quiz',
    loadComponent: () => import('./features/knowledge-center/quick-quiz').then(m => m.QuickQuiz),
  },
  {
    path: 'mock-exams',
    loadComponent: () => import('./features/technical-assessments/mock-exams').then(m => m.MockExams),
  },
  {
    path: 'testing',
    loadComponent: () => import('./features/testing-lab/testing-lab').then(m => m.TestingLab),
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/reports').then(m => m.Reports),
  },
  { path: '**', redirectTo: 'overview' },
];
