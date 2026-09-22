import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.initialTheme());
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.document.documentElement.dataset['theme'] = mode;
      this.document.documentElement.style.colorScheme = mode;
      try {
        localStorage.setItem('devforge.theme', mode);
      } catch {
        // Storage pode estar indisponível em modo privado; o tema continua funcionando na sessão.
      }
    });
  }

  toggle(): void {
    this.mode.update(mode => mode === 'light' ? 'dark' : 'light');
  }

  private initialTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem('devforge.theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
