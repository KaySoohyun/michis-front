import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CatStore } from '../../services/cat.store';
import { CatCardComponent } from './cat-card/cat-card.component';
import { AdoptFormComponent } from './adopt-form/adopt-form.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  imports: [CatCardComponent, AdoptFormComponent, SkeletonComponent],
  template: `
    <div class="mx-auto max-w-5xl px-4 py-8 font-body sm:px-6">
      <header class="mb-6 flex items-center justify-between gap-4">
        <h1 class="font-display text-2xl tracking-[0.2em] text-white">MIS MICHIS</h1>
        @if (canAdopt() && !showAdoptForm()) {
          <button
            type="button"
            (click)="showAdoptForm.set(true)"
            class="border-2 border-white/70 bg-[hsl(262_83%_58%)] px-3 py-1.5 font-display text-sm tracking-wider text-white hover:bg-[hsl(262_83%_65%)] focus-visible:outline-2 focus-visible:outline-accent"
          >
            + ADOPTAR
          </button>
        }
      </header>

      @if (showAdoptForm()) {
        <div class="mb-6">
          <app-adopt-form (onCancel)="showAdoptForm.set(false)" />
        </div>
      }

      @if (catStore.loading()) {
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (i of [1, 2, 3]; track i) {
            <app-skeleton />
          }
        </div>
      } @else if (catStore.error()) {
        <p
          class="pixel-frame bg-[hsl(0_60%_40%)] px-4 py-3 font-body text-sm text-white"
          role="alert"
        >
          {{ catStore.error() }}
        </p>
      } @else {
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (slot of slots(); track slot.slotNumber) {
            @if (slot.cat; as cat) {
              <app-cat-card [cat]="cat" (onRelease)="onRelease($event)" />
            } @else {
              <div
                class="pixel-frame flex min-h-44 flex-col items-center justify-center gap-2 bg-[hsl(230_20%_12%_/_0.6)] p-4 text-center"
              >
                <p class="font-display text-lg tracking-widest text-white/60">
                  SLOT {{ slot.slotNumber }}
                </p>
                <p class="text-xs text-white/50">Libre</p>
                <button
                  type="button"
                  (click)="showAdoptForm.set(true)"
                  class="mt-2 border-2 border-white/70 bg-[hsl(230_20%_24%)] px-3 py-1.5 font-display text-sm tracking-wider text-white hover:bg-[hsl(230_20%_30%)] focus-visible:outline-2 focus-visible:outline-accent"
                >
                  ADOPTAR
                </button>
              </div>
            }
          }
        </div>
      }
    </div>
  `,
})
export default class DashboardComponent implements OnInit {
  readonly catStore = inject(CatStore);
  readonly showAdoptForm = signal(false);

  protected readonly canAdopt = computed(() => this.catStore.availableSlots() > 0);

  protected readonly slots = computed(() => {
    const cats = this.catStore.cats();
    return [1, 2, 3].map((slotNumber) => ({
      slotNumber,
      cat: cats.find((c) => c.slotNumber === slotNumber) ?? null,
    }));
  });

  ngOnInit(): void {
    this.catStore.loadCats();
  }

  protected onRelease(catId: string): void {
    if (confirm('¿Estás seguro de liberar a este michi?')) {
      this.catStore.releaseCat(catId);
    }
  }
}