import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistService } from '../../../core/services/watchlist.service';
import { OrderService } from '../../../core/services/order.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: () => string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly watchlist = inject(WatchlistService);
  private readonly orders = inject(OrderService);
  readonly linkClick = output<void>();
  readonly navItems: NavItem[] = [
    { label: 'Visão geral', path: '/overview', icon: 'grid_view' },
    { label: 'Mercado', path: '/market', icon: 'monitoring', badge: () => '12' },
    { label: 'Watchlist', path: '/watchlist', icon: 'star_outline', badge: () => String(this.watchlist.count()) },
    { label: 'Ordens', path: '/orders', icon: 'swap_vert', badge: () => String(this.orders.orders().length) },
    { label: 'Portfólio', path: '/portfolio', icon: 'account_balance_wallet' },
    { label: 'Analytics', path: '/analytics', icon: 'query_stats' },
    { label: 'Central de risco', path: '/risk', icon: 'shield' },
  ];
}
