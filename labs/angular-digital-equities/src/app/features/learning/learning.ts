import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

interface LearningModule {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-learning',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule, RouterLink],
  templateUrl: './learning.html',
  styleUrl: './learning.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Learning {
  private readonly storageKey = 'equities-learning-progress';
  readonly modules: LearningModule[] = [
    { id: 'components', step: '01', title: 'Componentes e navegação', description: 'Standalone components, Angular Material e rotas carregadas sob demanda.', icon: 'view_quilt', skills: ['components', 'router', 'Material'] },
    { id: 'signals', step: '02', title: 'Signals e estado derivado', description: 'Mercado, watchlist e indicadores reativos sem estado duplicado.', icon: 'electric_bolt', skills: ['signal', 'computed', 'OnPush'] },
    { id: 'domain', step: '03', title: 'Formulários e domínio', description: 'Reactive Forms, ordens polimórficas e processamento FIFO.', icon: 'account_tree', skills: ['forms', 'POO', 'generics'] },
    { id: 'realtime', step: '04', title: 'HTTP e tempo real', description: 'DTO mapping, interceptor, RxJS e feed WebSocket intercambiável.', icon: 'sensors', skills: ['HttpClient', 'RxJS', 'WebSocket'] },
    { id: 'quality', step: '05', title: 'Risco, performance e testes', description: 'Guardrails, estado entre features e validação automatizada.', icon: 'verified_user', skills: ['risk', 'performance', 'tests'] },
  ];
  readonly exercises = [
    { level: 'Fundamento', title: 'Filtro de liquidez', description: 'Combine volume, busca e setor com computed.', icon: 'filter_alt' },
    { level: 'Aplicação', title: 'Cancelar ordem', description: 'Proteja a transição no domínio e mantenha a fila consistente.', icon: 'cancel_schedule_send' },
    { level: 'Aplicação', title: 'Reconectar o feed', description: 'Implemente backoff, status visual e cleanup testável.', icon: 'wifi_tethering_error' },
    { level: 'Arquitetura', title: 'Guardrail pré-trade', description: 'Bloqueie exposição excessiva fora do componente.', icon: 'shield' },
  ];
  readonly completed = signal<string[]>(this.restore());
  readonly progress = computed(() => Math.round(this.completed().length / this.modules.length * 100));
  readonly nextModule = computed(() => this.modules.find(module => !this.completed().includes(module.id)));

  toggle(id: string): void {
    this.completed.update(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    localStorage.setItem(this.storageKey, JSON.stringify(this.completed()));
  }

  private restore(): string[] {
    try { return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as string[]; }
    catch { return []; }
  }
}
