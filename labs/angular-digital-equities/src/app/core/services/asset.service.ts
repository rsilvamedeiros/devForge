import { inject, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Asset } from '../models/asset.model';
import { MOCK_ASSETS } from '../mock/assets.mock';
import { PRICE_FEED } from '../realtime/price-feed';

const SIMULATED_LATENCY_MS = 400;

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly priceFeed = inject(PRICE_FEED);
  private priceSubscription?: Subscription;

  private readonly _assets = signal<Asset[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly assets = this._assets.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(options: { simulateError?: boolean } = {}): void {
    this._loading.set(true);
    this._error.set(null);
    this.priceSubscription?.unsubscribe();

    setTimeout(() => {
      if (options.simulateError) {
        this._error.set('Falha ao carregar ativos. Tente novamente.');
        this._loading.set(false);
        return;
      }

      this._assets.set(MOCK_ASSETS);
      this._loading.set(false);
      this.streamPrices();
    }, SIMULATED_LATENCY_MS);
  }

  private streamPrices(): void {
    const initialPrices = Object.fromEntries(
      this._assets().map(asset => [asset.symbol, asset.price])
    );

    this.priceSubscription = this.priceFeed.connect(initialPrices).subscribe(tick => {
      this._assets.update(assets =>
        assets.map(asset => (asset.symbol === tick.symbol ? { ...asset, price: tick.price } : asset))
      );
    });
  }
}
