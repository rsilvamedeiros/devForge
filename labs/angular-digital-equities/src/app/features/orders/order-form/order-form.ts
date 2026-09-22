import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-form',
  imports: [DecimalPipe, ReactiveFormsModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderForm {
  private readonly fb = inject(FormBuilder);
  private readonly orderService = inject(OrderService);

  readonly submitError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    symbol: ['', [Validators.required]],
    side: ['buy' as 'buy' | 'sell', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
  });

  estimatedTotal(): number { return this.form.controls.quantity.value * this.form.controls.price.value; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const error = this.orderService.place({
      symbol: value.symbol.toUpperCase(),
      side: value.side,
      quantity: value.quantity,
      price: value.price,
    });

    if (error) {
      this.submitError.set(error);
      return;
    }

    this.submitError.set(null);
    this.form.reset({ symbol: '', side: 'buy', quantity: 1, price: 0 });
  }
}
