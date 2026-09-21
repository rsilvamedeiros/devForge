import { fakeAsync, tick } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { AssetList } from './asset-list';

describe('AssetList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetList],
    }).compileComponents();
  });

  it('shows a loading state while assets are being fetched', () => {
    const fixture = TestBed.createComponent(AssetList);
    fixture.detectChanges();

    expect(fixture.componentInstance.loading()).toBe(true);
    expect(fixture.componentInstance.assets().length).toBe(0);
  });

  it('lists the mocked assets once loaded', fakeAsync(() => {
    const fixture = TestBed.createComponent(AssetList);
    fixture.detectChanges();

    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.assets().length).toBeGreaterThan(0);
    expect(fixture.componentInstance.filteredAssets().length).toBe(
      fixture.componentInstance.assets().length
    );
  }));

  it('filters assets by ticker or name', fakeAsync(() => {
    const fixture = TestBed.createComponent(AssetList);
    fixture.detectChanges();
    tick(500);

    fixture.componentInstance.searchTerm.set('petr');
    fixture.detectChanges();

    const filtered = fixture.componentInstance.filteredAssets();
    expect(filtered.length).toBe(1);
    expect(filtered[0].symbol).toBe('PETR4');
  }));

  it('shows an error state when the load fails', fakeAsync(() => {
    const fixture = TestBed.createComponent(AssetList);
    fixture.detectChanges();
    tick(500);

    fixture.componentInstance.simulateError();
    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.error()).toBeTruthy();
  }));
});
