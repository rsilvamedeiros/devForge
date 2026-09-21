import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AssetService } from '../../../core/services/asset.service';
import { changePercent } from '../../../core/models/asset.model';

@Component({
  selector: 'app-asset-list',
  imports: [DecimalPipe],
  templateUrl: './asset-list.html',
  styleUrl: './asset-list.scss',
})
export class AssetList implements OnInit {
  private readonly assetService = inject(AssetService);

  readonly assets = this.assetService.assets;
  readonly loading = this.assetService.loading;
  readonly error = this.assetService.error;

  readonly searchTerm = signal('');
  readonly sectorFilter = signal<string>('all');

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

  ngOnInit(): void {
    this.assetService.load();
  }

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onSectorChange(event: Event): void {
    this.sectorFilter.set((event.target as HTMLSelectElement).value);
  }

  reload(): void {
    this.assetService.load();
  }

  simulateError(): void {
    this.assetService.load({ simulateError: true });
  }
}
