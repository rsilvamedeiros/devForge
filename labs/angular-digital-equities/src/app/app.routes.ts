import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview').then(m => m.Overview),
  },
  {
    path: 'market',
    loadComponent: () =>
      import('./features/market/asset-list/asset-list').then(m => m.AssetList),
  },
  {
    path: 'market/:symbol',
    loadComponent: () =>
      import('./features/market/asset-detail/asset-detail').then(m => m.AssetDetail),
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./features/watchlist/watchlist').then(m => m.Watchlist),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/orders-page/orders-page').then(m => m.OrdersPage),
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio').then(m => m.Portfolio),
  },
  {
    path: 'analytics',
    loadComponent: () => import('./features/analytics/analytics').then(m => m.Analytics),
  },
  {
    path: 'risk',
    loadComponent: () => import('./features/risk/risk').then(m => m.Risk),
  },
  {
    path: 'learning',
    loadComponent: () => import('./features/learning/learning').then(m => m.Learning),
  },
  {
    path: 'documentation',
    loadComponent: () => import('./features/documentation/documentation').then(m => m.Documentation),
  },
  { path: '**', redirectTo: 'overview' },
];
