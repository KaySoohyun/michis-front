import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { UserService } from '../../services/user.service';
import { InventoryItem, ItemType, Rarity } from '../../models';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';

@Component({
  selector: 'app-shop',
  imports: [ItemCardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Tienda</h1>
        <div class="flex items-center gap-2 text-lg">
          <span class="text-gray-600">Monedas:</span>
          <span class="font-bold text-yellow-600">💰 {{ userService.coins() }}</span>
        </div>
      </div>

      <div class="flex gap-4 mb-6 flex-wrap">
        <select
          (change)="onTypeFilter($event)"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Todos los tipos</option>
          @for (type of itemTypes; track type) {
            <option [value]="type">{{ type }}</option>
          }
        </select>

        <select
          (change)="onRarityFilter($event)"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Todas las rarezas</option>
          @for (rarity of rarities; track rarity) {
            <option [value]="rarity">{{ rarity }}</option>
          }
        </select>
      </div>

      @if (loading()) {
        <div class="text-center py-12 text-gray-500">Cargando tienda...</div>
      } @else if (error()) {
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {{ error() }}
        </div>
      } @else if (items().length === 0) {
        <div class="text-center py-12 text-gray-500">No hay ítems disponibles</div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    this.selectedType = value as ItemType || undefined;
    this.loadCatalog();
  }

  onRarityFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRarity = value as Rarity || undefined;
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
