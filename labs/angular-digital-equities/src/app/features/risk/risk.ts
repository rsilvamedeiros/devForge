import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AssetService } from '../../core/services/asset.service';
import { OrderService } from '../../core/services/order.service';

interface SectorExposure {
  sector: string;
  value: number;
  percent: number;
}

@Component({
  selector: 'app-risk',
  imports: [DecimalPipe, MatIconModule, RouterLink],
  templateUrl: './risk.html',
  styleUrl: './risk.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Risk implements OnInit {
  private readonly assetService = inject(AssetService);
  private readonly orderService = inject(OrderService);
  private readonly quantities: Record<string, number> = { PETR4: 680, ITUB4: 520, VALE3: 260, WEGE3: 210, B3SA3: 500, GGBR4: 280 };

  readonly openOrders = computed(() => this.orderService.orders().filter(order => order.status !== 'filled').length);
  readonly grossExposure = computed(() => this.assetService.assets().reduce((sum, asset) => sum + asset.price * (this.quantities[asset.symbol] ?? 0), 0));
  readonly exposures = computed<SectorExposure[]>(() => {
    const bySector = new Map<string, number>();
    for (const asset of this.assetService.assets()) {
      const value = asset.price * (this.quantities[asset.symbol] ?? 0);
      if (value) bySector.set(asset.sector, (bySector.get(asset.sector) ?? 0) + value);
    }
    const total = this.grossExposure();
    return [...bySector.entries()]
      .map(([sector, value]) => ({ sector, value, percent: total ? value / total * 100 : 0 }))
      .sort((a, b) => b.value - a.value);
  });
  readonly concentration = computed(() => this.exposures()[0]?.percent ?? 0);
  readonly riskScore = computed(() => Math.max(0, Math.round(92 - this.concentration() * .42 - this.openOrders() * 3)));

  readonly limits = [
    { label: 'Perda diária', used: 28, value: 'R$ 1.420 / R$ 5.000', status: 'Saudável' },
    { label: 'Exposição bruta', used: 64, value: 'R$ 127,8k / R$ 200k', status: 'Monitorar' },
    { label: 'Concentração por setor', used: 72, value: '32% / 45%', status: 'Monitorar' },
    { label: 'Ordens simultâneas', used: 20, value: '1 / 5', status: 'Saudável' },
  ];

  ngOnInit(): void {
    if (!this.assetService.assets().length) this.assetService.load();
  }
}
