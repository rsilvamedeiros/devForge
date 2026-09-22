import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { changePercent } from '../../core/models/asset.model';
import { AssetService } from '../../core/services/asset.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-overview',
  imports: [DecimalPipe, MatIconModule, RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview implements OnInit {
  private readonly assetService = inject(AssetService);
  private readonly orderService = inject(OrderService);
  readonly assets = this.assetService.assets;
  readonly orders = this.orderService.orders;
  readonly changePercent = changePercent;
  readonly movers = computed(() => [...this.assets()].sort((a, b) => Math.abs(changePercent(b)) - Math.abs(changePercent(a))).slice(0, 5));
  readonly totalVolume = computed(() => this.assets().reduce((sum, asset) => sum + asset.volume, 0));
  readonly positiveAssets = computed(() => this.assets().filter(asset => changePercent(asset) >= 0).length);
  ngOnInit(): void { if (!this.assets().length) this.assetService.load(); }
}
