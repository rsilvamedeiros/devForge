import { computed, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'atlas-trade.watchlist';
const DEFAULT_SYMBOLS = ['PETR4', 'ITUB4', 'WEGE3'];

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly _symbols = signal<string[]>(this.load());

  readonly symbols = this._symbols.asReadonly();
  readonly count = computed(() => this._symbols().length);

  has(symbol: string): boolean {
    return this._symbols().includes(symbol);
  }

  toggle(symbol: string): void {
    this._symbols.update(symbols =>
      symbols.includes(symbol)
        ? symbols.filter(item => item !== symbol)
        : [...symbols, symbol]
    );
    this.persist();
  }

  private load(): string[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : DEFAULT_SYMBOLS;
      return Array.isArray(parsed) && parsed.every(item => typeof item === 'string')
        ? parsed
        : DEFAULT_SYMBOLS;
    } catch {
      return DEFAULT_SYMBOLS;
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._symbols()));
    } catch {
      // A watchlist continua disponível na sessão sem armazenamento persistente.
    }
  }
}
