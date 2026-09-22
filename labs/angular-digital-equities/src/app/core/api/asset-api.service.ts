import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Asset } from '../models/asset.model';

export interface AssetDto {
  id: string;
  ticker: string;
  company_name: string;
  sector: string;
  last_price: number;
  previous_close: number;
  traded_volume: number;
  is_active: boolean;
}

@Injectable({ providedIn: 'root' })
export class AssetApi {
  private readonly http = inject(HttpClient);

  getAssets(options: { simulateError?: boolean } = {}): Observable<Asset[]> {
    const params = options.simulateError
      ? new HttpParams().set('simulateError', 'true')
      : undefined;

    return this.http.get<AssetDto[]>('/api/assets', { params }).pipe(
      map(items => items.map(item => this.toDomain(item)))
    );
  }

  private toDomain(dto: AssetDto): Asset {
    return {
      id: dto.id,
      symbol: dto.ticker,
      name: dto.company_name,
      sector: dto.sector,
      price: dto.last_price,
      previousClose: dto.previous_close,
      volume: dto.traded_volume,
      active: dto.is_active,
    };
  }
}
