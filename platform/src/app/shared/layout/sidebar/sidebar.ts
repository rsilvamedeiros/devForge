import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
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
    { label: 'Visão geral', path: '/dashboard', icon: 'grid_view' },
    { label: 'Meu progresso', path: '/progress', icon: 'trending_up' },
    { label: 'Jornada', path: '/journey', icon: 'route' },
    { label: 'Skills', path: '/skills', icon: 'school' },
    { label: 'Vagas', path: '/vacancies', icon: 'work' },
    { label: 'Challenges', path: '/challenges', icon: 'code' },
    { label: 'Planos de estudo', path: '/study-plans', icon: 'calendar_month' },
  ];
}
