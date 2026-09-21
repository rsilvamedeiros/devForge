import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-list',
  imports: [DecimalPipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  private readonly orderService = inject(OrderService);

  readonly orders = this.orderService.orders;
}
