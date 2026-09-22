import { TestBed } from '@angular/core/testing';
import { WatchlistService } from './watchlist.service';

describe('WatchlistService', () => {
  let service: WatchlistService;

  beforeEach(() => {
    localStorage.removeItem('atlas-trade.watchlist');
    TestBed.resetTestingModule();
    service = TestBed.inject(WatchlistService);
  });

  it('starts with the default symbols', () => {
    expect(service.symbols()).toEqual(['PETR4', 'ITUB4', 'WEGE3']);
  });

  it('adds and removes symbols', () => {
    service.toggle('VALE3');
    expect(service.has('VALE3')).toBeTrue();

    service.toggle('VALE3');
    expect(service.has('VALE3')).toBeFalse();
  });
});
