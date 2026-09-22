import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { changePercent } from '../../../core/models/asset.model';
import { AssetService } from '../../../core/services/asset.service';
import { WatchlistService } from '../../../core/services/watchlist.service';

@Component({
  selector: 'app-asset-detail',
  imports: [DecimalPipe, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './asset-detail.html',
  styleUrl: './asset-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly assetService = inject(AssetService);
  readonly watchlist = inject(WatchlistService);
  readonly loading = this.assetService.loading;
  readonly changePercent = changePercent;
  readonly symbol = toSignal(this.route.paramMap.pipe(map(params => params.get('symbol') ?? '')), { initialValue: '' });
  readonly asset = computed(() => this.assetService.assets().find(item => item.symbol === this.symbol()));
  readonly dayRange = computed(() => {
    const asset = this.asset();
    return asset ? { low: asset.price * .976, high: asset.price * 1.018 } : { low: 0, high: 0 };
  });

  readonly book = [
    { quantity: 1400, bid: -0.05, ask: 0.02, askQuantity: 800 },
    { quantity: 2300, bid: -0.04, ask: 0.03, askQuantity: 1600 },
    { quantity: 950, bid: -0.03, ask: 0.04, askQuantity: 2100 },
    { quantity: 3200, bid: -0.02, ask: 0.05, askQuantity: 1200 },
    { quantity: 1800, bid: -0.01, ask: 0.06, askQuantity: 2750 },
  ];

  ngOnInit(): void {
    if (!this.assetService.assets().length) this.assetService.load();
  }
}
