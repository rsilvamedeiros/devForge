import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/market/asset-list/asset-list').then(m => m.AssetList),
  },
];
