import { fakeAsync, tick } from '@angular/core/testing';
import { PriceTick } from './price-feed';
import { SimulatedPriceFeed } from './simulated-price-feed';

describe('SimulatedPriceFeed', () => {
  it('emits one tick per interval, only for known symbols', fakeAsync(() => {
    const feed = new SimulatedPriceFeed();
    const ticks: PriceTick[] = [];

    const subscription = feed
      .connect({ PETR4: 38.4, VALE3: 61.1 })
      .subscribe(tickValue => ticks.push(tickValue));

    tick(1500 * 5);
    subscription.unsubscribe();

    expect(ticks.length).toBe(5);
    for (const priceTick of ticks) {
      expect(['PETR4', 'VALE3']).toContain(priceTick.symbol);
      expect(priceTick.price).toBeGreaterThan(0);
    }
  }));

  it('keeps price jitter within the configured bound', fakeAsync(() => {
    const feed = new SimulatedPriceFeed();
    const prices: number[] = [];

    const subscription = feed.connect({ PETR4: 100 }).subscribe(priceTick => prices.push(priceTick.price));

    tick(1500 * 3);
    subscription.unsubscribe();

    for (const price of prices) {
      expect(price).toBeGreaterThan(95);
      expect(price).toBeLessThan(105);
    }
  }));

  it('stops emitting after unsubscribing', fakeAsync(() => {
    const feed = new SimulatedPriceFeed();
    const ticks: PriceTick[] = [];

    const subscription = feed.connect({ PETR4: 100 }).subscribe(priceTick => ticks.push(priceTick));

    tick(1500);
    subscription.unsubscribe();
    tick(1500 * 3);

    expect(ticks.length).toBe(1);
  }));
});
