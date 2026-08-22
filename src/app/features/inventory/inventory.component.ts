import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { UserInventory } from '../../models';

@Component({
  selector: 'app-inventory',
  imports: [RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Mi Inventario</h1>

      @if (loading()) {
        <div class="text-center py-12 text-gray-500">Cargando inventario...</div>
      } @else if (error()) {
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {{ error() }}
        </div>
      } @else if (items().length === 0) {
        <div class="text-center py-12 text-gray-500">
          <p class="text-lg mb-2">Tu inventario está vacío</p>
          <a routerLink="/dashboard/shop" class="text-blue-600 hover:text-blue-800">Ir a la tienda</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (entry of items(); track entry.id) {
            <div class="bg-white rounded-lg shadow-md p-4">
              <div class="flex items-start justify-between mb-2">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  🎁
                </div>
                <span class="text-sm text-gray-500">x{{ entry.quantity }}</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-1">{{ entry.item.name }}</h3>
              <p class="text-xs text-gray-500 mb-2">{{ entry.item.type }} · {{ entry.item.rarity }}</p>

              <div class="flex items-center justify-between">
                @if (entry.isEquipped) {
                  <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Equipado</span>
                } @else {
                  <span class="text-xs text-gray-400">No equipado</span>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export default class InventoryComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);

  readonly items = signal<UserInventory[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.loading.set(true);
    this.error.set(null);

    this.inventoryService.getInventory().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al cargar inventario');
        this.loading.set(false);
      },
    });
  }
}
