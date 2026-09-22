import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-list',
  imports: [DecimalPipe, MatTableModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderList {
  private readonly orderService = inject(OrderService);

  readonly orders = this.orderService.orders;
  readonly displayedColumns = ['symbol', 'side', 'quantity', 'price', 'netTotal', 'status'];
}
