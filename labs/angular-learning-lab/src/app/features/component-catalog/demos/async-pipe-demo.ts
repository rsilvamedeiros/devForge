import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map, startWith } from 'rxjs';

@Component({selector:'app-async-pipe-demo',imports:[AsyncPipe],template:`<div><span>Última revisão simulada</span><strong>{{review$ | async}}</strong></div><p>O AsyncPipe assina, atualiza a view e libera a assinatura com o componente.</p>`,styles:`div{display:flex;align-items:center;justify-content:space-between;padding:1rem;border:1px solid var(--lab-border);border-radius:10px;background:var(--lab-bg)}span,p{color:var(--lab-muted)}strong{font:600 1rem 'DM Mono'}p{margin:.8rem 0 0;font-size:.72rem}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class AsyncPipeDemo { readonly review$=interval(1000).pipe(map(value=>`há ${value+1}s`),startWith('agora')); }

