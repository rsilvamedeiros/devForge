import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { mockApiInterceptor } from '../http/mock-api.interceptor';
import { AssetApi } from './asset-api.service';

describe('AssetApi', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient(withInterceptors([mockApiInterceptor]))],
  }));

  it('maps API DTOs to the domain model', fakeAsync(() => {
    let symbol = '';
    TestBed.inject(AssetApi).getAssets().subscribe(assets => symbol = assets[0].symbol);
    tick(400);
    expect(symbol).toBe('PETR4');
  }));

  it('propagates simulated API errors', fakeAsync(() => {
    let status = 0;
    TestBed.inject(AssetApi).getAssets({ simulateError: true }).subscribe({
      error: error => status = error.status,
    });
    tick(400);
    expect(status).toBe(503);
  }));
});
