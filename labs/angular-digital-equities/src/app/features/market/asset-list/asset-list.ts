import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AssetService } from '../../../core/services/asset.service';
import { changePercent } from '../../../core/models/asset.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  imports: [
    DecimalPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetList implements OnInit {
  private readonly assetService = inject(AssetService);

  readonly assets = this.assetService.assets;
  readonly loading = this.assetService.loading;
  readonly error = this.assetService.error;

  readonly searchTerm = signal('');
  readonly sectorFilter = signal<string>('all');

  readonly displayedColumns = ['symbol', 'name', 'sector', 'price', 'change', 'volume'];

  readonly sectors = computed(() => {
    const unique = new Set(this.assets().map(asset => asset.sector));
    return ['all', ...unique];
  });

  readonly filteredAssets = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const sector = this.sectorFilter();

    return this.assets().filter(asset => {
      const matchesTerm =
        !term ||
        asset.symbol.toLowerCase().includes(term) ||
        asset.name.toLowerCase().includes(term);
      const matchesSector = sector === 'all' || asset.sector === sector;

      return matchesTerm && matchesSector;
    });
  });

  readonly changePercent = changePercent;
  readonly advancers = computed(() => this.assets().filter(asset => changePercent(asset) >= 0).length);
  readonly decliners = computed(() => this.assets().filter(asset => changePercent(asset) < 0).length);
  readonly totalVolume = computed(() => this.assets().reduce((sum, asset) => sum + asset.volume, 0));

  ngOnInit(): void {
    this.assetService.load();
  }

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onSectorChange(value: string): void {
    this.sectorFilter.set(value);
  }

  reload(): void {
    this.assetService.load();
  }

  simulateError(): void {
    this.assetService.load({ simulateError: true });
  }
}
