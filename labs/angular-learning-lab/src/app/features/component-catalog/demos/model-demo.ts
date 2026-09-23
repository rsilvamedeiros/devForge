import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';

@Component({selector:'app-title-editor',template:`<label>Título <input [value]="value()" (input)="value.set($any($event.target).value)" /></label>`,styles:`label{display:grid;gap:.4rem;color:var(--lab-muted)}input{padding:.65rem;border:1px solid var(--lab-border);border-radius:8px;color:var(--lab-text);background:var(--lab-bg)}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class TitleEditor { readonly value=model(''); }

@Component({selector:'app-model-demo',imports:[TitleEditor],template:`<app-title-editor [(value)]="title"/><p>Valor compartilhado: <strong>{{title()}}</strong></p>`,styles:`p{margin:.8rem 0 0;color:var(--lab-muted)}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class ModelDemo { readonly title=signal('Signals no Angular'); }
