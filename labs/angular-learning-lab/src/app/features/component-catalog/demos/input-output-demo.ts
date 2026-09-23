import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({selector:'app-score-control',imports:[MatButtonModule],template:`<div class="control"><span>{{label()}}</span><strong>{{value()}}</strong><button mat-stroked-button type="button" (click)="changed.emit(value() + 1)">Incrementar</button></div>`,styles:`.control{display:flex;align-items:center;gap:1rem}.control span{color:var(--lab-muted)}.control strong{font-size:1.4rem}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class ScoreControl { readonly label=input.required<string>(); readonly value=input(0); readonly changed=output<number>(); }

@Component({selector:'app-input-output-demo',imports:[ScoreControl],template:`<app-score-control label="Progresso" [value]="score()" (changed)="score.set($event)"/><p>O pai possui o estado; o filho recebe valor e emite intenção.</p>`,styles:`p{margin:.8rem 0 0;color:var(--lab-muted);font-size:.76rem}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class InputOutputDemo { readonly score=signal(40); }
