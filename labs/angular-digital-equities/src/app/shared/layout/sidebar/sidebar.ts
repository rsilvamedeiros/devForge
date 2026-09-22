import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly linkClick = output<void>();
  readonly navItems: NavItem[] = [
    { label: 'Visão geral', path: '/overview', icon: 'grid_view' },
    { label: 'Mercado', path: '/market', icon: 'monitoring', badge: '12' },
    { label: 'Ordens', path: '/orders', icon: 'swap_vert', badge: '3' },
    { label: 'Portfólio', path: '/portfolio', icon: 'account_balance_wallet' },
    { label: 'Analytics', path: '/analytics', icon: 'query_stats' },
  ];
}
