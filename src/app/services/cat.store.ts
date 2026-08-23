import { Injectable, signal, computed, inject, OnDestroy } from '@angular/core';
import { CatService } from './cat.service';
import { Cat, CatStatus, CreateCatRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class CatStore implements OnDestroy {
  private readonly catService = inject(CatService);
  private readonly catsSignal = signal<Cat[]>([]);
  private readonly selectedCatIdSignal = signal<string | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private decayInterval: ReturnType<typeof setInterval> | null = null;

  readonly cats = this.catsSignal.asReadonly();
  readonly selectedCatId = this.selectedCatIdSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly selectedCat = computed(() => {
    const id = this.selectedCatIdSignal();
    return this.catsSignal().find((c) => c.id === id) ?? null;
  });

  readonly catStatus = computed<CatStatus | null>(() => {
    const cat = this.selectedCat();
    if (!cat) return null;
    return {
      isHungry: cat.hunger < 30,
      isTired: cat.energy < 20,
      isSad: cat.happiness < 25,
      isDirty: cat.cleanliness < 30,
      isCritical: cat.hunger < 10 || cat.energy < 10,
    };
  });

  readonly availableSlots = computed(() => 3 - this.catsSignal().length);

  ngOnDestroy(): void {
    this.stopDecay();
  }

  loadCats(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.catService.getCats().subscribe({
      next: (cats) => {
        this.catsSignal.set(cats);
        this.loadingSignal.set(false);
        this.startDecay();
      },
      error: (err) => {
        this.errorSignal.set(err.error?.message || 'Error al cargar michis');
        this.loadingSignal.set(false);
      },
    });
  }

  selectCat(id: string): void {
    this.selectedCatIdSignal.set(id);
  }

  replaceCat(cat: Cat): void {
    this.catsSignal.update((list) => list.map((c) => (c.id === cat.id ? cat : c)));
  }

  adoptCat(data: CreateCatRequest): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.catService.adoptCat(data).subscribe({
      next: (response) => {
        this.catsSignal.update((list) => [...list, response.cat]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(err.error?.message || 'Error al adoptar michi');
        this.loadingSignal.set(false);
      },
    });
  }

  feedCat(catId: string, itemId: string): void {
    this.catService.feedCat(catId, itemId).subscribe({
      next: (response) => {
        this.catsSignal.update((list) =>
          list.map((c) => (c.id === catId ? response.cat : c)),
        );
      },
    });
  }

  playWithCat(catId: string): void {
    this.catService.playWithCat(catId).subscribe({
      next: (response) => {
        this.catsSignal.update((list) =>
          list.map((c) => (c.id === catId ? response.cat : c)),
        );
      },
    });
  }

  cleanCat(catId: string): void {
    this.catService.cleanCat(catId).subscribe({
      next: (response) => {
        this.catsSignal.update((list) =>
          list.map((c) => (c.id === catId ? response.cat : c)),
        );
      },
    });
  }

  sleepCat(catId: string, durationMinutes: number): void {
    this.catService.sleepCat(catId, durationMinutes).subscribe({
      next: (response) => {
        this.catsSignal.update((list) =>
          list.map((c) => (c.id === catId ? response.cat : c)),
        );
      },
    });
  }

  releaseCat(catId: string): void {
    this.catService.releaseCat(catId).subscribe({
      next: () => {
        this.catsSignal.update((list) => list.filter((c) => c.id !== catId));
        if (this.selectedCatIdSignal() === catId) {
          this.selectedCatIdSignal.set(null);
        }
      },
    });
  }

  private startDecay(): void {
    this.stopDecay();
    this.decayInterval = setInterval(() => {
      this.catsSignal.update((list) =>
        list.map((cat) => ({
          ...cat,
          hunger: Math.max(0, cat.hunger - 1),
          energy: Math.max(0, cat.energy - 0.5),
          happiness: Math.max(0, cat.happiness - 0.8),
          cleanliness: Math.max(0, cat.cleanliness - 0.3),
        })),
      );
    }, 60000);
  }

  private stopDecay(): void {
    if (this.decayInterval) {
      clearInterval(this.decayInterval);
      this.decayInterval = null;
    }
  }
}
