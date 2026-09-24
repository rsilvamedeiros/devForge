import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({selector:'app-view-query-demo',imports:[MatButtonModule],template:`<div #box tabindex="-1"><strong>Bloco consultado</strong><span>viewChild retorna uma referência reativa.</span></div><button mat-stroked-button type="button" (click)="focusBox()">Focar bloco</button>`,styles:`div{display:flex;margin-bottom:.8rem;padding:1rem;border:1px solid var(--lab-border);border-radius:10px;flex-direction:column}div:focus{outline:2px solid var(--lab-primary);outline-offset:2px}span{color:var(--lab-muted);font-size:.72rem}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class ViewQueryDemo { readonly box=viewChild<ElementRef<HTMLElement>>('box'); focusBox():void{this.box()?.nativeElement.focus()} }

