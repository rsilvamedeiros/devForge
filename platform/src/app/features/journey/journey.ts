import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SKILLS } from '../../core/data/content-index';

@Component({
  selector: 'app-journey',
  imports: [MatIconModule, RouterLink],
  templateUrl: './journey.html',
  styleUrl: './journey.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Journey {
  readonly totalSkills = SKILLS.length;
  readonly steps = [
    { icon: 'work_outline', title: 'Vaga', copy: 'Defina um alvo real', path: '/vacancies', status: 'done' },
    { icon: 'fact_check', title: 'Requisitos', copy: 'Traduza o que importa', path: '/vacancies', status: 'done' },
    { icon: 'school', title: 'Skills', copy: 'Mapeie conhecimento', path: '/skills', status: 'done' },
    { icon: 'fact_check', title: 'Avaliação', copy: 'Registre evidências', path: '/progress', status: 'active' },
    { icon: 'troubleshoot', title: 'Gaps', copy: 'Encontre a distância', path: '/progress', status: 'next' },
    { icon: 'calendar_month', title: 'Plano', copy: 'Priorize seu tempo', path: '/study-plans', status: 'next' },
    { icon: 'science', title: 'Prática', copy: 'Gere evidências', path: '/labs', status: 'next' },
  ];
}
