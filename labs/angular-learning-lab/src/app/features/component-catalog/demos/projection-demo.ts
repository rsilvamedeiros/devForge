import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({selector:'app-study-card',template:`<article><header><span>{{eyebrow()}}</span><ng-content select="[card-title]"/></header><div><ng-content/></div><footer><ng-content select="[card-actions]"/></footer></article>`,styles:`article{padding:1rem;border:1px solid var(--lab-border);border-radius:12px;background:var(--lab-bg)}header span{display:block;color:var(--lab-primary);font-size:.6rem;text-transform:uppercase}header ::ng-deep h3{margin:.25rem 0}.ng-star-inserted{}footer{margin-top:.8rem;padding-top:.7rem;border-top:1px solid var(--lab-border)}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class StudyCard { readonly eyebrow=input('Conteúdo'); }

@Component({selector:'app-projection-demo',imports:[StudyCard],template:`<app-study-card eyebrow="Módulo 04"><h3 card-title>Signals e RxJS</h3><p>O consumidor fornece conteúdo; o componente define estrutura e estilo.</p><a card-actions>Continuar estudo →</a></app-study-card>`,styles:`p{color:var(--lab-muted)}a{color:var(--lab-primary);font-weight:700}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class ProjectionDemo {}

