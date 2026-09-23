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
    path: 'components',
    loadComponent: () => import('./features/component-catalog/component-catalog').then(m => m.ComponentCatalog),
  },
  {
    path: 'examples',
    loadComponent: () => import('./features/examples/examples').then(m => m.Examples),
  },
  {
    path: 'assessments',
    loadComponent: () => import('./features/assessments/assessments').then(m => m.Assessments),
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/reports').then(m => m.Reports),
  },
  { path: '**', redirectTo: 'overview' },
];
