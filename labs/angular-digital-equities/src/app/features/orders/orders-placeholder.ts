import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-placeholder',
  imports: [],
  template: `
    <section class="placeholder">
      <h2>Orders</h2>
      <p>Em construção — próximo item do roadmap do lab: modelo de ordem, formulário de criação e a Queue&lt;T&gt; didática.</p>
    </section>
  `,
  styles: `
    .placeholder {
      padding: 1.5rem;
      color: #666;
    }
  `,
})
export class OrdersPlaceholder {}
