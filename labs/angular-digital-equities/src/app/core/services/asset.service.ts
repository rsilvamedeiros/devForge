import { Injectable, signal } from '@angular/core';
import { Asset } from '../models/asset.model';
import { MOCK_ASSETS } from '../mock/assets.mock';

const SIMULATED_LATENCY_MS = 400;

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly _assets = signal<Asset[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly assets = this._assets.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(options: { simulateError?: boolean } = {}): void {
    this._loading.set(true);
    this._error.set(null);

    setTimeout(() => {
      if (options.simulateError) {
        this._error.set('Falha ao carregar ativos. Tente novamente.');
        this._loading.set(false);
        return;
      }

      this._assets.set(MOCK_ASSETS);
      this._loading.set(false);
    }, SIMULATED_LATENCY_MS);
  }

  updatePrice(id: string, price: number): void {
    this._assets.update(assets =>
      assets.map(asset => (asset.id === id ? { ...asset, price } : asset))
    );
  }
}
