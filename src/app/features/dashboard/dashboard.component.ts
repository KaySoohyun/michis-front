import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatStore } from '../../services/cat.store';
import { CatConsoleComponent } from './cat-console/cat-console.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  imports: [CatConsoleComponent, RouterLink, SkeletonComponent],
  template: `
    <div class="mx-auto w-full max-w-fit px-4 pb-4 font-body sm:px-6">
      <header class="mb-3">
        <h1 class="font-display text-xl tracking-[0.2em] text-white">MIS MICHIS</h1>
      </header>

      @if (catStore.loading()) {
        <div class="flex flex-row flex-wrap items-start justify-center gap-16">
          @for (i of [1, 2, 3]; track i) {
            <app-skeleton class="block h-[calc(100dvh-8rem)] w-96" />
          }
        </div>
      } @else if (catStore.error(); as error) {
        <p class="pixel-frame bg-[hsl(0_60%_40%)] px-4 py-3 font-body text-sm text-white" role="alert">
          {{ error }}
        </p>
      } @else {
        <div class="flex flex-row flex-wrap items-start justify-center gap-16">
          @for (slot of slots(); track slot.slotNumber) {
            @if (slot.cat; as cat) {
              <app-cat-console [cat]="cat" class="block w-96" />
            } @else {
              <div
                class="pixel-frame flex h-44 w-96 flex-col items-center justify-center gap-2 bg-[hsl(230_20%_12%_/_0.6)] p-4 text-center"
              >
                <p class="font-display text-lg tracking-widest text-white/60">
                  SLOT {{ slot.slotNumber }}
                </p>
                <p class="text-xs text-white/50">Libre</p>
                <a
                  routerLink="/dashboard/adoptar"
                  class="mt-2 border-2 border-white/40 px-3 py-1.5 font-display text-xs tracking-wider text-white/70 hover:border-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
                >
                  Adoptá en ✨ ADOPTAR
                </a>
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
}
