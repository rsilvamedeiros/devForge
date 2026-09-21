import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'market', pathMatch: 'full' },
  {
    path: 'market',
    loadComponent: () =>
      import('./features/market/asset-list/asset-list').then(m => m.AssetList),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/orders-placeholder').then(m => m.OrdersPlaceholder),
  },
];
