import { Component, inject, input, signal } from '@angular/core';
import { Cat } from '../../../models';
import { CatStore } from '../../../services/cat.store';
import { CatService } from '../../../services/cat.service';
import { InventoryService } from '../../../services/inventory.service';
import { ConsoleTopBarComponent } from './console/console-top-bar/console-top-bar.component';
import { StatusMeterComponent } from './console/status-meter/status-meter.component';
import {
  ActionBarComponent,
  ConsoleAction,
} from './console/action-bar/action-bar.component';

/**
 * Consola Tamagotchi de un michi. Se usa en el dashboard (una por slot
 * ocupado); no navega ni libera: eso vive fuera de la consola.
 */
@Component({
  selector: 'app-cat-console',
  imports: [
    ConsoleTopBarComponent,
    StatusMeterComponent,
    ActionBarComponent,
  ],
  template: `
    <section
      class="pixel-frame flex flex-col bg-[hsl(230_25%_10%)]"
      [attr.aria-label]="'Consola de ' + cat().name"
    >
      <app-console-top-bar [name]="cat().name" [birthDate]="cat().birthDate" />

      <div class="flex flex-col gap-4 p-4">
        <!-- Pantalla del michi -->
        <div >
          <div
            class="bg-[hsl(230_20%_14%)]"
            aria-hidden="true"
          >
            @if (cat().avatarUrl) {
              <img
                [src]="cat().avatarUrl"
                [alt]="cat().name"
                class="object-contain"
              />
            } @else {
              <pre class="font-display text-xl leading-snug text-white sm:text-2xl">
    ／l、
  （ﾟ､ ｡ ７
    |、 ~ヽ
    じしf_, )ノ</pre>
            }
          </div>
          <p class="sr-only">{{ cat().name }}, especie {{ cat().species }}.</p>
        </div>

        <!-- Panel STATUS -->
        <aside class="pixel-frame space-y-2 bg-[hsl(230_20%_12%)] p-3 font-body">
          <h2
            class="border-b-2 border-white/40 pb-1 text-center font-display text-sm tracking-[0.2em] text-white/80"
          >
            STATUS
          </h2>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <app-status-meter label="FELIZ" kind="hearts" icon="♥" [value]="cat().happiness" />
            <app-status-meter label="HAMBRE" icon="🍴" [value]="cat().hunger" />
            <app-status-meter label="SUEÑO" icon="☾" [value]="cat().energy" />
            <app-status-meter label="LIMPIO" icon="✿" [value]="cat().cleanliness" />
          </div>
        </aside>
      </div>

      <app-action-bar [disabled]="!canAct()" (action)="onAction($event)" />

      @if (feedback(); as msg) {
        <p class="px-4 py-2 font-body text-xs text-success" role="status">{{ msg }}</p>
      }
    </section>
  `,
})
export class CatConsoleComponent {
  private readonly catStore = inject(CatStore);
  private readonly catService = inject(CatService);
  private readonly inventoryService = inject(InventoryService);

  readonly cat = input.required<Cat>();

  readonly feedback = signal<string | null>(null);

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

  /** La API exige un inventoryItemId de comida; se elige el primero disponible. */
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
}
