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
        localStorage.setItem('angular-learning-lab.theme', mode);
      } catch {
        // O tema continua ativo na sessão quando o storage não está disponível.
      }
    });
  }

  toggle(): void {
    this.mode.update(mode => mode === 'dark' ? 'light' : 'dark');
  }

  private initialTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem('angular-learning-lab.theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  }
}
