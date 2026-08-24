import { Component, inject, input, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatStore } from '../../../services/cat.store';
import { CatService } from '../../../services/cat.service';
import { InventoryService } from '../../../services/inventory.service';
import { UserInventory } from '../../../models';
import { ConsoleTopBarComponent } from './console/console-top-bar/console-top-bar.component';
import { StatusMeterComponent } from './console/status-meter/status-meter.component';
import { LevelBadgeComponent } from './console/level-badge/level-badge.component';
import { DialogBoxComponent } from './console/dialog-box/dialog-box.component';
import {
  ActionBarComponent,
  ConsoleAction,
} from './console/action-bar/action-bar.component';

@Component({
  selector: 'app-cat-detail',
  imports: [
    ConsoleTopBarComponent,
    StatusMeterComponent,
    LevelBadgeComponent,
    DialogBoxComponent,
    ActionBarComponent,
  ],
  template: `
    @if (loadError(); as error) {
      <p class="pixel-frame bg-[hsl(0_60%_40%)] px-4 py-3 text-sm text-white" role="alert">
        {{ error }}
      </p>
    } @else if (cat(); as cat) {
      <div class="mx-auto max-w-3xl">
        <button
          type="button"
          (click)="goBack()"
          class="mb-3 font-display text-base tracking-wider text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
        >
          ← Volver
        </button>

        <!-- Consola Tamagotchi -->
        <section class="pixel-frame bg-[hsl(230_25%_10%)]" [attr.aria-label]="'Consola de ' + cat.name">
          <app-console-top-bar [name]="cat.name" />

          <div class="grid gap-4 p-4 md:grid-cols-[190px_1fr]">
            <!-- Panel STATUS -->
            <aside class="pixel-frame space-y-2 bg-[hsl(230_20%_12%)] p-3 font-body">
              <h2
                class="border-b-2 border-white/40 pb-1 text-center font-display text-sm tracking-[0.2em] text-white/80"
              >
                STATUS
              </h2>
              <app-status-meter label="FELIZ" kind="hearts" icon="♥" [value]="cat.happiness" />
              <app-status-meter label="HAMBRE" icon="🍴" [value]="cat.hunger" />
              <app-status-meter label="SUEÑO" icon="☾" [value]="cat.energy" />
              <app-status-meter label="LIMPIO" icon="✿" [value]="cat.cleanliness" />
              <div class="border-t-2 border-white/40 pt-2">
                <app-level-badge [birthDate]="cat.birthDate" />
              </div>
            </aside>

            <!-- Pantalla del michi -->
            <div class="flex flex-col items-center justify-center">
              <div
                class="pixel-frame flex min-h-56 w-full flex-1 items-center justify-center bg-[hsl(230_20%_14%)] p-4"
                aria-hidden="true"
              >
                @if (cat.avatarUrl) {
                  <img
                    [src]="cat.avatarUrl"
                    [alt]="cat.name"
                    class="pixelated max-h-52 object-contain"
                  />
                } @else {
                  <pre class="font-display text-xl leading-snug text-white sm:text-2xl">
    ／l、
   （ﾟ､ ｡ ７
    |、 ~ヽ
    じしf_, )ノ</pre>
                }
              </div>
              <p class="sr-only">{{ cat.name }}, especie {{ cat.species }}.</p>
            </div>
          </div>

          <div class="px-4 pb-4">
            <app-dialog-box class="w-full" [cat]="cat" [status]="status()" />
          </div>

          <app-action-bar [disabled]="!canAct()" (action)="onAction($event)" />

          <!-- Equipar del inventario -->
          <div class="border-t-4 border-white/70 bg-[hsl(230_20%_12%)] p-3 font-body">
            <h3 class="mb-2 font-display text-sm tracking-[0.2em] text-white/80">ACCESORIOS</h3>
            @if (clothing().length === 0) {
              <p class="text-xs text-white/60">No tienes ropa en tu inventario. ¡Pasá por la tienda!</p>
            } @else {
              <ul class="flex flex-wrap gap-2">
                @for (entry of clothing(); track entry.id) {
                  <li>
                    <button
                      type="button"
                      (click)="toggleEquip(entry)"
                      [disabled]="equipping()"
                      [attr.aria-pressed]="isEquipped(entry.itemId)"
                      [attr.aria-label]="
                        (isEquipped(entry.itemId) ? 'Desequipar ' : 'Equipar ') + entry.item.name
                      "
                      class="min-h-11 border-2 px-2 py-1 text-xs text-white focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50"
                      [class]="
                        isEquipped(entry.itemId)
                          ? 'border-accent bg-accent/20'
                          : 'border-white/70 bg-[hsl(230_20%_18%)] hover:bg-[hsl(230_20%_24%)]'
                      "
                    >
                      👕 {{ entry.item.name }}
                    </button>
                  </li>
                }
              </ul>
            }
          </div>
        </section>

        @if (feedback(); as msg) {
          <p class="mt-2 font-body text-sm text-success" role="status">{{ msg }}</p>
        }
      </div>
    } @else {
      <p class="py-12 text-center font-body text-white/60">Cargando michi...</p>
    }
  `,
})
export class CatDetailComponent implements OnInit {
  private readonly catStore = inject(CatStore);
  private readonly catService = inject(CatService);
  private readonly inventoryService = inject(InventoryService);
  private readonly router = inject(Router);

  readonly catId = input.required<string>({ alias: 'id' });

  readonly cat = this.catStore.selectedCat;
  readonly status = this.catStore.catStatus;

  readonly loadError = signal<string | null>(null);
  readonly clothing = signal<UserInventory[]>([]);
  readonly feedback = signal<string | null>(null);
  readonly equipping = signal(false);

  ngOnInit(): void {
    // Resolución inmediata si el store ya tiene el michi (ej: viniste del dashboard)...
    this.catStore.selectCat(this.catId());
    // ...y en todos los casos se refresca desde GET /cats/:id (stats al día,
    // y la pantalla funciona entrando directo por URL).
    this.catService.getCat(this.catId()).subscribe({
      next: ({ cat }) => {
        this.catStore.upsertCat(cat);
        this.catStore.selectCat(cat.id);
      },
      error: () =>
        this.loadError.set('No se pudo cargar el michi. Volvé al dashboard e intentá de nuevo.'),
    });
    this.inventoryService.getInventory().subscribe({
      next: (items) =>
        this.clothing.set(items.filter((e) => e.item.type === 'CLOTHING' && e.quantity > 0)),
      error: () => this.clothing.set([]),
    });
  }

  protected canAct(): boolean {
    const cat = this.cat();
    return !!cat && cat.energy > 0 && cat.isAlive;
  }

  protected onAction(action: ConsoleAction): void {
    const cat = this.cat();
    if (!cat) return;
    this.feedback.set(null);

    switch (action) {
      case 'feed':
        this.feed(cat.id);
        break;
      case 'play':
        this.catStore.playWithCat(cat.id);
        break;
      case 'clean':
        this.catStore.cleanCat(cat.id);
        break;
      case 'sleep':
        this.catStore.sleepCat(cat.id, 30);
        break;
    }
  }

  protected isEquipped(itemId: string): boolean {
    return this.cat()?.equippedItems?.includes(itemId) ?? false;
  }

  protected toggleEquip(entry: UserInventory): void {
    const cat = this.cat();
    if (!cat || this.equipping()) return;

    this.equipping.set(true);
    const request = this.isEquipped(entry.itemId)
      ? this.catService.unequipCat(cat.id, entry.itemId)
      : this.catService.equipCat(cat.id, entry.itemId);

    request.subscribe({
      next: ({ cat: updated }) => {
        if (updated) this.catStore.replaceCat(updated);
        else if (this.isEquipped(entry.itemId)) {
          this.catStore.replaceCat({
            ...cat,
            equippedItems: cat.equippedItems.filter((id) => id !== entry.itemId),
          });
        } else {
          this.catStore.replaceCat({
            ...cat,
            equippedItems: [...(cat.equippedItems ?? []), entry.itemId],
          });
        }
        this.equipping.set(false);
        this.feedback.set(
          this.isEquipped(entry.itemId)
            ? `${entry.item.name} equipado ✨`
            : `${entry.item.name} guardado en el bolso`,
        );
      },
      error: () => {
        this.equipping.set(false);
        this.feedback.set('No se pudo cambiar el accesorio. Intentá de nuevo.');
      },
    });
  }

  private feed(catId: string): void {
    this.inventoryService.getInventory().subscribe({
      next: (all) => {
        const food = all.find((e) => e.item.type === 'FOOD' && e.quantity > 0);
        if (!food) {
          this.feedback.set('No tenés comida en el inventario. ¡Visitá la tienda!');
          return;
        }
        this.catStore.feedCat(catId, food.itemId);
      },
      error: () => this.feedback.set('No se pudo cargar el inventario para alimentar.'),
    });
  }

  protected goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
