import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ANGULAR_AREAS, KnowledgeLevel } from '../../core/data/angular-knowledge';

@Component({selector:'app-curriculum',imports:[MatIconModule,RouterLink],templateUrl:'./curriculum.html',styleUrl:'./curriculum.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class Curriculum {
  readonly levels: Array<'Todos' | KnowledgeLevel> = ['Todos','Fundamento','Intermediário','Avançado'];
  readonly activeLevel = signal<(typeof this.levels)[number]>('Todos');
  readonly areas = computed(() => ANGULAR_AREAS.filter(area => this.activeLevel() === 'Todos' || area.level === this.activeLevel()));
  readonly topicCount = ANGULAR_AREAS.reduce((total, area) => total + area.topics.length, 0);
}

