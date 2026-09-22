import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SKILLS } from '../../core/data/content-index';

interface LearningTrack {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number | null;
  totalHours: number;
  skills: string[];
  nextSkill: string;
}

@Component({
  selector: 'app-tracks',
  imports: [MatIconModule, RouterLink],
  templateUrl: './tracks.html',
  styleUrl: './tracks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tracks {
  readonly Math = Math;
  readonly tracks: LearningTrack[] = [
    {
      slug: 'frontend-specialist',
      title: 'Frontend Specialist',
      description: 'Interfaces robustas, reativas e prontas para escala.',
      icon: 'web',
      color: '#6558f5',
      progress: null,
      totalHours: 18,
      skills: ['angular', 'typescript', 'rxjs', 'performance', 'websockets'],
      nextSkill: 'rxjs',
    },
    {
      slug: 'computer-science',
      title: 'Computer Science',
      description: 'Fundamentos para resolver problemas com clareza e eficiência.',
      icon: 'data_object',
      color: '#36aeb9',
      progress: null,
      totalHours: 12,
      skills: ['algorithms-big-o', 'arrays-lists', 'data-structures'],
      nextSkill: 'data-structures',
    },
    {
      slug: 'software-engineering',
      title: 'Software Engineering',
      description: 'Decisões, arquitetura e código sustentável em produção.',
      icon: 'account_tree',
      color: '#e29a43',
      progress: null,
      totalHours: 16,
      skills: ['architecture', 'oop', 'solid', 'queues-messaging'],
      nextSkill: 'architecture',
    },
  ];

  skill(slug: string) {
    return SKILLS.find(item => item.slug === slug)!;
  }
}
