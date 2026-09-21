import { Component } from '@angular/core';
import { OrderForm } from '../order-form/order-form';
import { OrderList } from '../order-list/order-list';

@Component({
  selector: 'app-orders-page',
  imports: [OrderForm, OrderList],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage {}
