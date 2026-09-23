import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CodeEditor } from '../examples/code-editor';
import { SANDBOX_CHALLENGES, SandboxChallenge, SandboxFile } from './sandbox-challenges';

interface CheckResult { label: string; passed: boolean; hint: string; }
type Workspace = Record<string, string>;
const STORAGE_KEY = 'angular-learning-lab.sandbox';

@Component({
  selector: 'app-angular-sandbox',
  imports: [MatIconModule, CodeEditor],
  templateUrl: './angular-sandbox.html',
  styleUrl: './angular-sandbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularSandbox {
  readonly challenges = SANDBOX_CHALLENGES;
  readonly selected = signal<SandboxChallenge>(this.challenges[0]);
  readonly workspace = signal<Workspace>(this.createWorkspace(this.challenges[0]));
  readonly activeFile = signal<SandboxFile>(this.challenges[0].files[0]);
  readonly results = signal<CheckResult[]>([]);
  readonly completed = signal<string[]>(this.restoreCompleted());
  readonly passedCount = computed(() => this.results().filter(result => result.passed).length);
  readonly allPassed = computed(() => this.results().length > 0 && this.passedCount() === this.results().length);
  readonly currentValue = computed(() => this.workspace()[this.activeFile().name] ?? '');

  openChallenge(challenge: SandboxChallenge): void {
    this.selected.set(challenge);
    this.workspace.set(this.restoreWorkspace(challenge));
    this.activeFile.set(challenge.files[0]);
    this.results.set([]);
  }

  openFile(file: SandboxFile): void { this.activeFile.set(file); }

  updateFile(content: string): void {
    this.workspace.update(current => ({ ...current, [this.activeFile().name]: content }));
    this.persistWorkspace();
    this.results.set([]);
  }

  validate(): void {
    const current = this.workspace();
    const results = this.selected().checks.map(check => ({
      label: check.label,
      passed: check.pattern.test(current[check.file] ?? ''),
      hint: check.hint,
    }));
    this.results.set(results);
    if (results.every(result => result.passed)) {
      this.completed.update(ids => ids.includes(this.selected().id) ? ids : [...ids, this.selected().id]);
      try { localStorage.setItem(`${STORAGE_KEY}.completed`, JSON.stringify(this.completed())); } catch { /* sessão */ }
    }
  }

  reset(): void {
    this.workspace.set(this.createWorkspace(this.selected()));
    this.activeFile.set(this.selected().files[0]);
    this.results.set([]);
    try { localStorage.removeItem(`${STORAGE_KEY}.${this.selected().id}`); } catch { /* sessão */ }
  }

  private createWorkspace(challenge: SandboxChallenge): Workspace {
    return Object.fromEntries(challenge.files.map(file => [file.name, file.content]));
  }

  private persistWorkspace(): void {
    try { localStorage.setItem(`${STORAGE_KEY}.${this.selected().id}`, JSON.stringify(this.workspace())); } catch { /* sessão */ }
  }

  private restoreWorkspace(challenge: SandboxChallenge): Workspace {
    try {
      const saved = JSON.parse(localStorage.getItem(`${STORAGE_KEY}.${challenge.id}`) ?? 'null');
      return saved && typeof saved === 'object' ? { ...this.createWorkspace(challenge), ...saved } : this.createWorkspace(challenge);
    } catch { return this.createWorkspace(challenge); }
  }

  private restoreCompleted(): string[] {
    try {
      const saved = JSON.parse(localStorage.getItem(`${STORAGE_KEY}.completed`) ?? '[]');
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
  }
}
