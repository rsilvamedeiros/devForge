import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AssetService } from './asset.service';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetService);
  });

  it('loads the mocked assets after the simulated latency', fakeAsync(() => {
    service.load();
    expect(service.loading()).toBe(true);

    tick(500);

    expect(service.loading()).toBe(false);
    expect(service.assets().length).toBeGreaterThan(0);
  }));

  it('streams simulated price updates once assets are loaded', fakeAsync(() => {
    service.load();
    tick(500);

    const initialPrices = service.assets().map(asset => asset.price);

    tick(1500 * 10);

    const updatedPrices = service.assets().map(asset => asset.price);
    expect(updatedPrices).not.toEqual(initialPrices);
  }));

  it('restarts the price stream on reload instead of stacking subscriptions', fakeAsync(() => {
    service.load();
    tick(500);
    service.load();
    tick(500);

    expect(() => tick(1500 * 5)).not.toThrow();
  }));
});
