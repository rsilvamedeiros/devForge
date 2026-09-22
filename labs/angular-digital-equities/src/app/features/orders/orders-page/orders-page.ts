import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { OrderForm } from '../order-form/order-form';
import { OrderList } from '../order-list/order-list';

@Component({
  selector: 'app-orders-page',
  imports: [OrderForm, OrderList, MatCardModule],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage {}
