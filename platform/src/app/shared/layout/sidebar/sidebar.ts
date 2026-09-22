import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: string;
  badgeTone?: 'neutral' | 'progress' | 'live';
}

interface NavGroup {
  label: string;
  items: NavItem[];
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

  readonly navGroups: NavGroup[] = [
    {
      label: 'Visão',
      items: [
        { label: 'Visão geral', path: '/dashboard', icon: 'grid_view' },
        { label: 'Meu progresso', path: '/progress', icon: 'trending_up', badge: '72%', badgeTone: 'progress' },
        { label: 'Insights', path: '/insights', icon: 'monitoring' },
        { label: 'Jornada', path: '/journey', icon: 'route' },
      ],
    },
    {
      label: 'Aprendizado',
      items: [
        { label: 'Trilhas', path: '/tracks', icon: 'timeline', badge: '3', badgeTone: 'neutral' },
        { label: 'Skills', path: '/skills', icon: 'school', badge: '13', badgeTone: 'neutral' },
        { label: 'Challenges', path: '/challenges', icon: 'terminal', badge: '2/6', badgeTone: 'progress' },
        { label: 'Planos de estudo', path: '/study-plans', icon: 'calendar_month' },
      ],
    },
    {
      label: 'Carreira',
      items: [{ label: 'Vagas', path: '/vacancies', icon: 'work_outline', badge: '1 ativa', badgeTone: 'live' }],
    },
  ];
}
