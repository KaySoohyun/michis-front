import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { UserService } from '../../services/user.service';
import { InventoryItem, ItemType, Rarity } from '../../models';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';

@Component({
  selector: 'app-shop',
  imports: [ItemCardComponent],
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 font-body sm:px-6 lg:px-8">
      <header class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 class="font-display text-2xl tracking-[0.2em] text-white">TIENDA</h1>
        <p class="font-display text-lg text-accent">
          <span aria-hidden="true">🪙</span>
          <span class="sr-only">Monedas:</span> {{ userService.coins() }}
        </p>
      </header>

      <div class="mb-6 flex flex-wrap gap-4">
        <label class="flex items-center gap-2">
          <span class="font-display text-sm tracking-wider text-white/80">TIPO</span>
          <select
            (change)="onTypeFilter($event)"
            class="border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-accent"
          >
            <option value="" class="bg-[hsl(230_25%_10%)]">Todos</option>
            @for (type of itemTypes; track type) {
              <option [value]="type" class="bg-[hsl(230_25%_10%)]">{{ type }}</option>
            }
          </select>
        </label>

        <label class="flex items-center gap-2">
          <span class="font-display text-sm tracking-wider text-white/80">RAREZA</span>
          <select
            (change)="onRarityFilter($event)"
            class="border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-accent"
          >
            <option value="" class="bg-[hsl(230_25%_10%)]">Todas</option>
            @for (rarity of rarities; track rarity) {
              <option [value]="rarity" class="bg-[hsl(230_25%_10%)]">{{ rarity }}</option>
            }
          </select>
        </label>
      </div>

      @if (loading()) {
        <p class="py-12 text-center text-white/60">Cargando tienda...</p>
      } @else if (error()) {
        <p
          class="pixel-frame bg-[hsl(0_60%_40%)] px-4 py-3 text-sm text-white"
          role="alert"
        >
          {{ error() }}
        </p>
      } @else if (items().length === 0) {
        <p class="py-12 text-center text-white/60">No hay ítems disponibles</p>
      } @else {
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          @for (item of items(); track item.id) {
            <app-item-card [item]="item" (onBuy)="onBuy($event)" />
          }
        </div>
      }
    </div>
  `,
})
export default class ShopComponent implements OnInit {
  private readonly shopService = inject(ShopService);
  readonly userService = inject(UserService);

  readonly items = signal<InventoryItem[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly itemTypes = Object.values(ItemType);
  readonly rarities = Object.values(Rarity);

  private selectedType: ItemType | undefined;
  private selectedRarity: Rarity | undefined;

  ngOnInit(): void {
    this.loadCatalog();
  }

  loadCatalog(): void {
    this.loading.set(true);
    this.error.set(null);

    this.shopService.getCatalog(this.selectedType, this.selectedRarity).subscribe({
      next: (res) => {
        this.items.set(res.items);
        this.userService.updateCoins(res.userCoins);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al cargar tienda');
        this.loading.set(false);
      },
    });
  }

  onTypeFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedType = (value as ItemType) || undefined;
    this.loadCatalog();
  }

  onRarityFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRarity = (value as Rarity) || undefined;
    this.loadCatalog();
  }

  onBuy(itemId: string): void {
    this.shopService.buyItem({ itemId, quantity: 1 }).subscribe({
      next: (res) => {
        this.userService.updateCoins(res.remainingCoins);
        this.loadCatalog();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al comprar');
      },
    });
  }
}