import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({selector:'app-control-flow-demo',imports:[MatButtonModule],template:`<div class="actions">@for(state of states;track state){<button mat-stroked-button type="button" (click)="active.set(state)">{{state}}</button>}</div><div class="result">@switch(active()){@case('loading'){<span>Carregando conteúdo…</span>}@case('empty'){<span>Nenhum módulo encontrado.</span>}@case('error'){<span class="error">Falha controlada. Tente novamente.</span>}@default{<strong>5 módulos prontos para estudar.</strong>}}</div>`,styles:`.actions{display:flex;flex-wrap:wrap;gap:.4rem}.result{margin-top:1rem;padding:1rem;border:1px solid var(--lab-border);border-radius:10px;background:var(--lab-bg)}.error{color:var(--lab-negative)}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class ControlFlowDemo { readonly states=['loading','empty','error','ready']; readonly active=signal('ready'); }

