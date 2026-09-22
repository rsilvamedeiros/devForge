import { inject, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Asset } from '../models/asset.model';
import { AssetApi } from '../api/asset-api.service';
import { PRICE_FEED } from '../realtime/price-feed';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly priceFeed = inject(PRICE_FEED);
  private readonly assetApi = inject(AssetApi);
  private priceSubscription?: Subscription;
  private loadSubscription?: Subscription;

  private readonly _assets = signal<Asset[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly assets = this._assets.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(options: { simulateError?: boolean } = {}): void {
    this._loading.set(true);
    this._error.set(null);
    this.loadSubscription?.unsubscribe();
    this.priceSubscription?.unsubscribe();

    this.loadSubscription = this.assetApi.getAssets(options).subscribe({
      next: assets => {
        this._assets.set(assets);
        this._loading.set(false);
        this.streamPrices();
      },
      error: () => {
        this._error.set('Falha ao carregar ativos. Tente novamente.');
        this._loading.set(false);
      },
    });
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
