import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { UserInventory } from '../../models';

@Component({
  selector: 'app-inventory',
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 font-body sm:px-6 lg:px-8">
      <h1 class="mb-6 font-display text-2xl tracking-[0.2em] text-white">MI INVENTARIO</h1>

      @if (loading()) {
        <p class="py-12 text-center text-white/60">Cargando inventario...</p>
      } @else if (error()) {
        <p
          class="pixel-frame bg-[hsl(0_60%_40%)] px-4 py-3 text-sm text-white"
          role="alert"
        >
          {{ error() }}
        </p>
      } @else if (items().length === 0) {
        <div class="py-12 text-center">
          <p class="mb-2 text-lg text-white/70">Tu inventario está vacío</p>
          <a
            routerLink="/dashboard/shop"
            class="font-display text-accent underline hover:text-[hsl(45_93%_55%)]"
          >IR A LA TIENDA</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (entry of items(); track entry.id) {
            <div class="pixel-frame bg-[hsl(230_20%_12%)] p-4">
              <div class="mb-2 flex items-start justify-between">
                <div
                  class="grid size-10 place-items-center bg-[hsl(230_20%_18%)] text-xl"
                  aria-hidden="true"
                >
                  🎁
                </div>
                <span class="font-display text-sm text-white/70">x{{ entry.quantity }}</span>
              </div>

              <h3 class="mb-1 font-display text-lg text-white">{{ entry.item.name }}</h3>
              <p class="mb-2 text-xs uppercase tracking-wider text-white/60">
                {{ entry.item.type }} · {{ entry.item.rarity }}
              </p>

              <div class="flex items-center justify-between">
                @if (entry.isEquipped) {
                  <span class="bg-[hsl(142_71%_35%)] px-2 py-0.5 font-display text-xs tracking-wider text-white">
                    EQUIPADO
                  </span>
                } @else {
                  <span class="text-xs text-white/50">No equipado</span>
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