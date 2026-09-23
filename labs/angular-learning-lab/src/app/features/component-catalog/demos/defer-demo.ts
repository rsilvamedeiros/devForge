import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({selector:'app-defer-demo',imports:[MatButtonModule,MatIconModule],template:`<button mat-stroked-button type="button" (click)="loaded.set(true)">Carregar recurso</button>@defer(when loaded()){<div class="content"><mat-icon>check_circle</mat-icon><strong>Conteúdo pesado carregado</strong><span>O bloco e suas dependências podem ocupar um chunk separado.</span></div>}@placeholder{<div class="placeholder">Aguardando intenção do usuário.</div>}`,styles:`.content,.placeholder{display:flex;margin-top:.8rem;padding:1rem;border:1px solid var(--lab-border);border-radius:10px;flex-direction:column}.content mat-icon{color:var(--lab-positive)}.content span,.placeholder{color:var(--lab-muted);font-size:.72rem}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class DeferDemo { readonly loaded=signal(false); }
