import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { KittensService } from '../../../services/kittens.service';
import { CatStore } from '../../../services/cat.store';
import { KittenProfile } from '../../../models';

@Component({
  selector: 'app-adoptar',
  template: `
    <div class="mx-auto max-w-5xl px-4 py-8 font-body sm:px-6">
      <h1 class="mb-2 font-display text-2xl tracking-[0.2em] text-white">ADOPCIÓN</h1>
      <p class="mb-6 text-sm text-white/60">
        Hoy están estos {{ kittensService.kittens().length }} viajeros del refugio
        cósmico; mañana llegan otros.
      </p>

      @if (!hasFreeSlots()) {
        <p
          class="pixel-frame mb-6 bg-[hsl(230_20%_16%)] px-4 py-3 text-sm text-white/80"
          role="status"
        >
          Tenés los 3 slots ocupados. Liberá un michi para poder adoptar uno nuevo.
        </p>
      }

      @if (kittensService.loading()) {
        <p class="text-sm text-white/60" role="status">Cargando gatitos...</p>
      } @else if (kittensService.error(); as error) {
        <p
          class="pixel-frame bg-[hsl(0_60%_40%)] px-4 py-3 text-sm text-white"
          role="alert"
        >
          {{ error }}
        </p>
      } @else if (kittensService.kittens().length === 0) {
        <p class="pixel-frame bg-[hsl(230_20%_16%)] px-4 py-3 text-sm text-white/80" role="status">
          Hoy no hay gatitos disponibles. Volvé mañana.
        </p>
      } @else {
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
          @for (kitten of kittensService.kittens(); track kitten.id) {
            <li class="pixel-frame flex flex-col bg-[hsl(230_20%_12%_/_0.8)] p-4">
              <div class="flex items-center gap-4">
                <div class="size-20 shrink-0 overflow-hidden border-2 border-white/30">
                  @if (kittensService.imageUrl(kitten); as src) {
                    <img [src]="src" [alt]="'Foto de ' + kitten.name" loading="lazy" class="size-full object-cover" />
                  } @else {
                    <div class="grid size-full place-items-center text-4xl" aria-hidden="true">🐱</div>
                  }
                </div>
                <div>
                  <h2 class="font-display text-lg text-white">{{ kitten.name }}</h2>
                  <p class="text-xs text-accent">{{ kitten.species }}</p>
                </div>
              </div>

              <dl class="mb-4 mt-4 flex-1 space-y-2 text-sm">
                <div>
                  <dt class="font-display tracking-wider text-white/80">DESCRIPCIÓN</dt>
                  <dd class="text-white/70">{{ kitten.description }}</dd>
                </div>
                <div>
                  <dt class="font-display tracking-wider text-white/80">PERSONALIDAD</dt>
                  <dd class="text-white/70">{{ kitten.personality }}</dd>
                </div>
                <div>
                  <dt class="font-display tracking-wider text-white/80">HISTORIA</dt>
                  <dd class="text-white/70">{{ kitten.lore }}</dd>
                </div>
              </dl>

              @if (catStore.error()) {
                <p class="mb-3 text-sm text-red-300" role="alert">{{ catStore.error() }}</p>
              }

              <button
                type="button"
                (click)="onAdopt(kitten)"
                [disabled]="!hasFreeSlots() || catStore.loading()"
                class="w-full border-2 border-white/70 bg-[hsl(262_83%_58%)] px-4 py-2 font-display tracking-widest text-white hover:bg-[hsl(262_83%_65%)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent"
              >
                ADOPTAR EN SLOT {{ firstFreeSlot() }}
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class AdoptarComponent implements OnInit {
  readonly kittensService = inject(KittensService);
  readonly catStore = inject(CatStore);

  readonly firstFreeSlot = computed(() => {
    const taken = new Set(this.catStore.cats().map((c) => c.slotNumber));
    return ([1, 2, 3] as const).find((s) => !taken.has(s)) ?? null;
  });

  readonly hasFreeSlots = computed(() => this.firstFreeSlot() !== null);

  ngOnInit(): void {
    this.kittensService.loadKittens().subscribe();
  }

  onAdopt(kitten: KittenProfile): void {
    const slot = this.firstFreeSlot();
    if (slot === null) return;

    this.catStore.adoptCat({
      name: kitten.name,
      slotNumber: slot,
      species: kitten.species,
      personality: kitten.personality,
      lore: kitten.lore,
    });
  }
}
