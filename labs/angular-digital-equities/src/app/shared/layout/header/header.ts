import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  readonly theme = inject(ThemeService);
  readonly menuToggle = output<void>();
  readonly searchTerm = signal('');

  search(event: Event): void {
    event.preventDefault();
    const symbol = this.searchTerm().trim().toUpperCase();
    if (!symbol) return;
    this.router.navigate(['/market', symbol]);
    this.searchTerm.set('');
  }
}
