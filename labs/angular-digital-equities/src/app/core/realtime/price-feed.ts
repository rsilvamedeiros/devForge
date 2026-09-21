import { inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { SimulatedPriceFeed } from './simulated-price-feed';

export interface PriceTick {
  symbol: string;
  price: number;
}

export interface PriceFeed {
  connect(initialPrices: Record<string, number>): Observable<PriceTick>;
}

export const PRICE_FEED = new InjectionToken<PriceFeed>('PRICE_FEED', {
  providedIn: 'root',
  factory: () => inject(SimulatedPriceFeed),
});
