export type SandboxLanguage = 'typescript' | 'html' | 'scss';

export interface SandboxFile { name: string; language: SandboxLanguage; content: string; }
export interface SandboxCheck { label: string; file: string; pattern: RegExp; hint: string; }
export interface SandboxChallenge {
  id: string; level: string; title: string; description: string; icon: string;
  requirements: string[]; files: SandboxFile[]; checks: SandboxCheck[];
}

export const SANDBOX_CHALLENGES: SandboxChallenge[] = [
  {
    id: 'signal-counter', level: 'Júnior', title: 'Componente com Signals', icon: 'signals',
    description: 'Finalize um contador standalone, acessível e derivado sem duplicar estado.',
    requirements: ['Use signal e computed', 'Conecte eventos no template', 'Crie feedback visual responsivo'],
    files: [
      { name: 'counter.component.ts', language: 'typescript', content: `import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  readonly count = signal(0);
  // TODO: crie double com computed

  increment(): void {
    // TODO: atualize o signal
  }
}` },
      { name: 'counter.component.html', language: 'html', content: `<section class="counter" aria-labelledby="counter-title">
  <h2 id="counter-title">Contador reativo</h2>
  <strong>{{ count() }}</strong>
  <!-- TODO: exiba double() e conecte o botão -->
  <button type="button">Incrementar</button>
</section>` },
      { name: 'counter.component.scss', language: 'scss', content: `.counter {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;

  // TODO: estilize o estado de foco do botão
}` },
      { name: 'counter.component.spec.ts', language: 'typescript', content: `describe('CounterComponent', () => {
  it('increments the counter', () => {
    // TODO: teste o comportamento público
  });
});` },
    ],
    checks: [
      { label: 'Estado derivado usa computed', file: 'counter.component.ts', pattern: /double\s*=\s*computed\s*\(/, hint: 'Declare readonly double = computed(() => ...).' },
      { label: 'Atualização imutável do signal', file: 'counter.component.ts', pattern: /count\.update\s*\(/, hint: 'Use count.update em increment().' },
      { label: 'Evento conectado no template', file: 'counter.component.html', pattern: /\(click\)\s*=\s*["']increment\(\)["']/, hint: 'Associe o click do botão ao método.' },
      { label: 'Valor derivado renderizado', file: 'counter.component.html', pattern: /double\(\)/, hint: 'Mostre double() no template.' },
      { label: 'Foco visível', file: 'counter.component.scss', pattern: /:focus-visible/, hint: 'Adicione estilo :focus-visible.' },
      { label: 'Teste executa increment', file: 'counter.component.spec.ts', pattern: /increment\(\)/, hint: 'Exercite o método no teste.' },
    ],
  },
  {
    id: 'typed-search', level: 'Pleno', title: 'Busca assíncrona tipada', icon: 'manage_search',
    description: 'Implemente uma busca com Reactive Forms, cancelamento de requests e estados de interface.',
    requirements: ['FormControl não anulável', 'switchMap para concorrência', 'Loading, vazio e erro no template'],
    files: [
      { name: 'search.component.ts', language: 'typescript', content: `import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchApi } from './search.api';

@Component({ selector: 'app-search', standalone: true, templateUrl: './search.component.html' })
export class SearchComponent {
  private readonly api = inject(SearchApi);
  readonly query = new FormControl('', { nonNullable: true });

  // TODO: crie results$ com debounce, distinctUntilChanged e switchMap
}` },
      { name: 'search.component.html', language: 'html', content: `<label for="query">Buscar cursos</label>
<input id="query" type="search" [formControl]="query" />

<!-- TODO: renderize loading, erro, vazio e resultados -->` },
      { name: 'search.api.ts', language: 'typescript', content: `import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Course { id: string; title: string; }

@Injectable({ providedIn: 'root' })
export class SearchApi {
  search(query: string): Observable<Course[]> { return of([]); }
}` },
      { name: 'search.component.spec.ts', language: 'typescript', content: `describe('SearchComponent', () => {
  it('cancels the previous request', () => {
    // TODO: valide concorrência com marble ou subjects controlados
  });
});` },
    ],
    checks: [
      { label: 'Concorrência com switchMap', file: 'search.component.ts', pattern: /switchMap\s*\(/, hint: 'Use switchMap no fluxo de valueChanges.' },
      { label: 'Redução de eventos', file: 'search.component.ts', pattern: /debounceTime\s*\(/, hint: 'Aplique debounceTime antes do request.' },
      { label: 'Evita buscas repetidas', file: 'search.component.ts', pattern: /distinctUntilChanged\s*\(/, hint: 'Use distinctUntilChanged().' },
      { label: 'Controle tipado não anulável', file: 'search.component.ts', pattern: /nonNullable\s*:\s*true/, hint: 'Mantenha o FormControl nonNullable.' },
      { label: 'Estado vazio no template', file: 'search.component.html', pattern: /@empty|length\s*===\s*0/, hint: 'Represente explicitamente o estado vazio.' },
      { label: 'Teste de cancelamento', file: 'search.component.spec.ts', pattern: /cancel|unsubscribe|flush/i, hint: 'Implemente uma asserção de cancelamento.' },
    ],
  },
  {
    id: 'feature-boundary', level: 'Sênior', title: 'Feature com boundary', icon: 'account_tree',
    description: 'Modele providers, rota lazy e facade para impedir vazamento de infraestrutura.',
    requirements: ['Provider function tree-shakable', 'Resolver funcional', 'Facade como contrato público'],
    files: [
      { name: 'courses.routes.ts', language: 'typescript', content: `import { Routes } from '@angular/router';

export const COURSES_ROUTES: Routes = [
  // TODO: rota lazy com resolver funcional
];` },
      { name: 'courses.providers.ts', language: 'typescript', content: `import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideCourses(): EnvironmentProviders {
  // TODO: componha providers da feature
  return makeEnvironmentProviders([]);
}` },
      { name: 'courses.facade.ts', language: 'typescript', content: `import { Injectable, signal } from '@angular/core';

@Injectable()
export class CoursesFacade {
  // TODO: exponha estado somente leitura e comandos sem revelar HttpClient
}` },
      { name: 'courses.facade.spec.ts', language: 'typescript', content: `describe('CoursesFacade', () => {
  it('keeps the previous data when refresh fails', () => {
    // TODO: teste a política de resiliência
  });
});` },
    ],
    checks: [
      { label: 'Rota carregada sob demanda', file: 'courses.routes.ts', pattern: /loadComponent|loadChildren/, hint: 'Use loadComponent ou loadChildren.' },
      { label: 'Resolver funcional', file: 'courses.routes.ts', pattern: /resolve\s*:/, hint: 'Adicione resolve à configuração da rota.' },
      { label: 'Provider function', file: 'courses.providers.ts', pattern: /makeEnvironmentProviders\s*\(/, hint: 'Componha providers com makeEnvironmentProviders.' },
      { label: 'Estado encapsulado', file: 'courses.facade.ts', pattern: /asReadonly\s*\(/, hint: 'Exponha um signal readonly.' },
      { label: 'Comando explícito', file: 'courses.facade.ts', pattern: /load\s*\(|refresh\s*\(/, hint: 'Crie load() ou refresh().' },
      { label: 'Resiliência testada', file: 'courses.facade.spec.ts', pattern: /fail|error|throwError/i, hint: 'Simule falha no teste.' },
    ],
  },
];
