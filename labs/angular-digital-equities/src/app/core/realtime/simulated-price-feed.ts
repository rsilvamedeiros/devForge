import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import type { PriceFeed, PriceTick } from './price-feed';

const TICK_INTERVAL_MS = 1500;
const MAX_JITTER_RATIO = 0.015;

@Injectable({ providedIn: 'root' })
export class SimulatedPriceFeed implements PriceFeed {
  connect(initialPrices: Record<string, number>): Observable<PriceTick> {
    const lastPrices = new Map(Object.entries(initialPrices));
    const symbols = Object.keys(initialPrices);

    return interval(TICK_INTERVAL_MS).pipe(
      map(() => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const basePrice = lastPrices.get(symbol)!;
        const jitter = basePrice * MAX_JITTER_RATIO * (Math.random() * 2 - 1);
        const nextPrice = Number(Math.max(0.01, basePrice + jitter).toFixed(2));

        lastPrices.set(symbol, nextPrice);
        return { symbol, price: nextPrice };
      })
    );
  }
}
