import { ChangeDetectionStrategy, Component, Directive, HostListener, input } from '@angular/core';

@Directive({selector:'[appLearningHighlight]',host:{'[style.borderColor]':'active ? color() : "var(--lab-border)"','[style.background]':'active ? "var(--lab-primary-soft)" : "var(--lab-bg)"','[style.transform]':'active ? "translateY(-2px)" : "none"'}})
export class LearningHighlightDirective { readonly color=input('#55d6be'); active=false; @HostListener('mouseenter') enter():void{this.active=true} @HostListener('mouseleave') leave():void{this.active=false} }

@Component({selector:'app-directive-demo',imports:[LearningHighlightDirective],template:`<div appLearningHighlight><strong>Passe o mouse</strong><p>A diretiva adiciona comportamento sem criar outra estrutura visual.</p></div>`,styles:`div{padding:1rem;border:1px solid var(--lab-border);border-radius:11px;transition:160ms ease}p{margin:.35rem 0 0;color:var(--lab-muted)}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class DirectiveDemo {}

