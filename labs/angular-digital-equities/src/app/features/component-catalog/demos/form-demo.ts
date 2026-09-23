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
        <mat-label>Ticker</mat-label>
        <input matInput formControlName="symbol" placeholder="PETR4" />
        @if (form.controls.symbol.touched && form.controls.symbol.hasError('required')) {
          <mat-error>Informe o ticker.</mat-error>
        }
        @if (form.controls.symbol.touched && form.controls.symbol.hasError('pattern')) {
          <mat-error>Use 4 letras + 1 dígito (ex.: PETR4).</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Quantidade</mat-label>
        <input matInput type="number" formControlName="quantity" />
        @if (form.controls.quantity.touched && form.controls.quantity.invalid) {
          <mat-error>Mínimo de 100.</mat-error>
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
    .demo-note { margin: .8rem 0 0; color: var(--trade-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemo {
  private readonly fb = inject(FormBuilder);
  readonly submitted = signal('');

  readonly form = this.fb.nonNullable.group({
    symbol: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{4}\d$/)]],
    quantity: [100, [Validators.required, Validators.min(100)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.submitted.set(`${value.symbol.toUpperCase()} · ${value.quantity}`);
  }
}
