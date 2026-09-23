import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { Sidebar } from './shared/layout/sidebar/sidebar';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly isHandset = toSignal(this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)), { initialValue: false });
  readonly sidenavOpened = signal(true);

  constructor() { effect(() => this.sidenavOpened.set(!this.isHandset())); }
  toggleMenu(): void { this.sidenavOpened.update(open => !open); }
  closeOnNavigate(): void { if (this.isHandset()) this.sidenavOpened.set(false); }
}
