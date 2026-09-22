import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, mergeMap, of, throwError, timer } from 'rxjs';
import { MOCK_ASSETS } from '../mock/assets.mock';
import { AssetDto } from '../api/asset-api.service';

const API_LATENCY_MS = 400;

export const mockApiInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url !== '/api/assets') return next(request);

  if (request.params.get('simulateError') === 'true') {
    return timer(API_LATENCY_MS).pipe(
      mergeMap(() => throwError(() => new HttpErrorResponse({ status: 503, statusText: 'Service Unavailable' })))
    );
  }

  const body: AssetDto[] = MOCK_ASSETS.map(asset => ({
    id: asset.id,
    ticker: asset.symbol,
    company_name: asset.name,
    sector: asset.sector,
    last_price: asset.price,
    previous_close: asset.previousClose,
    traded_volume: asset.volume,
    is_active: asset.active,
  }));

  return of(new HttpResponse({ status: 200, body })).pipe(delay(API_LATENCY_MS));
};
