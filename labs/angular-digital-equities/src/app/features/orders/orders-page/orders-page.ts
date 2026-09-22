import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../../core/services/order.service';
import { OrderForm } from '../order-form/order-form';
import { OrderList } from '../order-list/order-list';

@Component({
  selector: 'app-orders-page',
  imports: [OrderForm, OrderList, MatCardModule, MatIconModule],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage {
  private readonly orderService = inject(OrderService);
  readonly orders = this.orderService.orders;
  readonly filled = computed(() => this.orders().filter(order => order.status === 'filled').length);
  readonly pending = computed(() => this.orders().filter(order => order.status !== 'filled').length);
  readonly volume = computed(() => this.orders().reduce((sum, order) => sum + order.grossTotal, 0));
}
