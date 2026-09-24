import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-demo',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="demo-form">
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="name" placeholder="Ada Lovelace" />
        @if (form.controls.name.touched && form.controls.name.hasError('required')) {
          <mat-error>Informe o nome.</mat-error>
        }
        @if (form.controls.name.touched && form.controls.name.hasError('minlength')) {
          <mat-error>Use ao menos 3 caracteres.</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>E-mail</mat-label>
        <input matInput type="email" formControlName="email" placeholder="ada@exemplo.dev" />
        @if (form.controls.email.touched && form.controls.email.invalid) {
          <mat-error>Informe um e-mail válido.</mat-error>
        }
      </mat-form-field>

      <button mat-flat-button color="primary" type="submit">Enviar</button>
    </form>

    <p class="demo-note">Estado do form: <strong>{{ form.status }}</strong></p>
    @if (submitted(); as value) {
      <p class="demo-note">Último envio válido: <code>{{ value }}</code></p>
    }
  `,
  styles: `
    .demo-form { display: flex; flex-wrap: wrap; align-items: flex-start; gap: .75rem; }
    .demo-note { margin: .8rem 0 0; color: var(--lab-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemo {
  private readonly fb = inject(FormBuilder);
  readonly submitted = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.submitted.set(`${value.name} · ${value.email}`);
  }
}
