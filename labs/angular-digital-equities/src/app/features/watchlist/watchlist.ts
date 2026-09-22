import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { changePercent } from '../../core/models/asset.model';
import { AssetService } from '../../core/services/asset.service';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  imports: [DecimalPipe, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Watchlist implements OnInit {
  private readonly assetService = inject(AssetService);
  readonly watchlist = inject(WatchlistService);
  readonly changePercent = changePercent;

  readonly assets = computed(() => {
    const symbols = this.watchlist.symbols();
    return this.assetService.assets().filter(asset => symbols.includes(asset.symbol));
  });
  readonly averageChange = computed(() => {
    const assets = this.assets();
    return assets.length
      ? assets.reduce((sum, asset) => sum + changePercent(asset), 0) / assets.length
      : 0;
  });
  readonly advancers = computed(() => this.assets().filter(asset => changePercent(asset) >= 0).length);
  readonly totalVolume = computed(() => this.assets().reduce((sum, asset) => sum + asset.volume, 0));

  ngOnInit(): void {
    if (!this.assetService.assets().length) this.assetService.load();
  }
}
