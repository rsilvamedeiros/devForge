import { inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import type { PriceFeed, PriceTick } from './price-feed';

interface SubscribeMessage {
  type: 'subscribe';
  symbols: string[];
}

export const WEBSOCKET_PRICE_FEED_URL = new InjectionToken<string>('WEBSOCKET_PRICE_FEED_URL', {
  providedIn: 'root',
  factory: () => 'wss://localhost:8080/prices',
});

export function parsePriceTick(message: unknown): PriceTick | null {
  if (
    typeof message === 'object' &&
    message !== null &&
    typeof (message as Record<string, unknown>)['symbol'] === 'string' &&
    typeof (message as Record<string, unknown>)['price'] === 'number'
  ) {
    return {
      symbol: (message as Record<string, unknown>)['symbol'] as string,
      price: (message as Record<string, unknown>)['price'] as number,
    };
  }
  return null;
}

/**
 * Same contract as SimulatedPriceFeed, backed by a real WebSocket connection.
 * Requires a server that accepts a `{ type: 'subscribe', symbols }` message
 * and replies with `{ symbol, price }` messages. Not wired as the default
 * PriceFeed (there's no bundled server) — swap it in via `PRICE_FEED` in
 * app.config.ts once a real endpoint exists.
 */
@Injectable({ providedIn: 'root' })
export class WebSocketPriceFeed implements PriceFeed {
  private readonly url = inject(WEBSOCKET_PRICE_FEED_URL);

  connect(initialPrices: Record<string, number>): Observable<PriceTick> {
    const symbols = Object.keys(initialPrices);
    const socket = webSocket<unknown>(this.url);

    return new Observable<PriceTick>(observer => {
      const subscription = socket.subscribe({
        next: message => {
          const tick = parsePriceTick(message);
          if (tick) {
            observer.next(tick);
          }
        },
        error: error => observer.error(error),
        complete: () => observer.complete(),
      });

      socket.next({ type: 'subscribe', symbols } satisfies SubscribeMessage);

      return () => subscription.unsubscribe();
    });
  }
}
