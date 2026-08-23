import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cat } from '../../../models';
import { ClockService } from '../../../services/clock.service';

@Component({
  selector: 'app-cat-card',
  imports: [RouterLink],
  template: `
    <div class="pixel-frame flex h-full flex-col bg-[hsl(230_20%_12%)] p-3 font-body">
      <div class="flex items-start gap-3">
        <div
          class="pixel-frame grid size-14 shrink-0 place-items-center bg-[hsl(230_20%_18%)] text-3xl"
          aria-hidden="true"
        >
          🐱
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h3 class="truncate font-display text-xl tracking-wide text-white" [title]="cat().name">
              {{ cat().name }}
            </h3>
            @if (isCritical()) {
              <span
                class="shrink-0 bg-[hsl(0_84%_60%)] px-1.5 py-0.5 font-display text-xs text-white"
                title="Estado crítico"
              >⚠️</span>
            }
          </div>
          <p class="truncate font-body text-xs text-white/70">{{ cat().species }}</p>
          <p class="font-display text-sm text-accent">LV.{{ level() }}</p>
        </div>
      </div>

      <div class="mt-3 grid grid-cols-4 gap-1.5" [attr.aria-label]="statsAria()">
        @for (stat of stats(); track stat.key) {
          <div class="flex flex-col items-center gap-1">
            <span class="text-sm leading-none" aria-hidden="true">{{ stat.icon }}</span>
            <span class="flex gap-0.5" aria-hidden="true">
              @for (cell of stat.cells; track $index) {
                <span
                  class="size-2 border border-white/70"
                  [class]="cell ? 'bg-success' : 'bg-transparent'"
                ></span>
              }
            </span>
          </div>
        }
      </div>

      <div class="mt-3 flex gap-2 pt-1">
        <a
          [routerLink]="['/dashboard/cat', cat().id]"
          class="flex-1 border-2 border-white/70 bg-[hsl(262_83%_58%)] px-2 py-1.5 text-center font-display text-sm tracking-wider text-white hover:bg-[hsl(262_83%_65%)] focus-visible:outline-2 focus-visible:outline-accent"
        >
          VER
        </a>
        <button
          type="button"
          (click)="onRelease.emit(cat().id)"
          class="border-2 border-white/70 bg-[hsl(0_60%_40%)] px-2 py-1.5 font-display text-sm tracking-wider text-white hover:bg-[hsl(0_60%_50%)] focus-visible:outline-2 focus-visible:outline-accent"
        >
          LIBERAR
        </button>
      </div>
    </div>
  `,
})
export class CatCardComponent {
  private readonly clock = inject(ClockService);

  readonly cat = input.required<Cat>();
  readonly onRelease = output<string>();

  protected readonly isCritical = computed(() => {
    const c = this.cat();
    return c.hunger < 10 || c.energy < 10;
  });

  protected readonly level = computed(() => {
    const birth = new Date(this.cat().birthDate).getTime();
    const days = Math.max(0, Math.floor((this.clock.now().getTime() - birth) / 86_400_000));
    return Math.floor(days / 7) + 1;
  });

  protected readonly stats = computed(() => {
    const c = this.cat();
    return [
      { key: 'happy', label: 'felicidad', icon: '♥', value: c.happiness },
      { key: 'hunger', label: 'hambre', icon: '🍖', value: c.hunger },
      { key: 'energy', label: 'energía', icon: '⚡', value: c.energy },
      { key: 'clean', label: 'limpieza', icon: '🧼', value: c.cleanliness },
    ].map((s) => ({
      ...s,
      cells: Array.from({ length: 5 }, (_, i) => i < Math.round(s.value / 20)),
    })) as { key: string; label: string; icon: string; value: number; cells: boolean[] }[];
  });

  protected readonly statsAria = computed(() =>
    this.stats()
      .map((s) => `${s.label} ${s.value} de 100`)
      .join(', '),
  );
}