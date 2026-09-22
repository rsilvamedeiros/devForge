import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AssetService } from '../../core/services/asset.service';

@Component({ selector: 'app-portfolio', imports: [DecimalPipe, MatIconModule, RouterLink], templateUrl: './portfolio.html', styleUrl: './portfolio.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class Portfolio implements OnInit {
  private readonly assetService = inject(AssetService);
  private readonly quantities: Record<string, number> = { PETR4: 680, ITUB4: 520, VALE3: 260, WEGE3: 210, B3SA3: 500, GGBR4: 280 };
  readonly positions = computed(() => this.assetService.assets().filter(asset => this.quantities[asset.symbol]).map(asset => ({ ...asset, quantity: this.quantities[asset.symbol], averagePrice: asset.previousClose * .96, marketValue: asset.price * this.quantities[asset.symbol], pnl: (asset.price - asset.previousClose * .96) * this.quantities[asset.symbol] })));
  readonly total = computed(() => this.positions().reduce((sum, item) => sum + item.marketValue, 0));
  readonly totalPnl = computed(() => this.positions().reduce((sum, item) => sum + item.pnl, 0));
  ngOnInit(): void { if (!this.assetService.assets().length) this.assetService.load(); }
}
