import { Component, computed, inject, input } from '@angular/core';
import { ClockService } from '../../../../../services/clock.service';

@Component({
  selector: 'app-level-badge',
  template: `
    <div class="font-display text-sm leading-tight text-white">
      <p>LV.{{ level() }}</p>
      <div
        class="mt-0.5 flex h-3 w-28 border-2 border-white/80"
        role="progressbar"
        [attr.aria-valuenow]="exp()"
        aria-valuemin="0"
        aria-valuemax="200"
        [attr.aria-label]="'Experiencia decorativa: nivel ' + level()"
      >
        <div class="bg-accent" [style.width.%]="(exp() / 200) * 100"></div>
      </div>
      <p class="text-xs text-white/70">EXP {{ exp() }}/200</p>
    </div>
  `,
})
export class LevelBadgeComponent {
  private readonly clock = inject(ClockService);

  readonly birthDate = input.required<string>();

  protected readonly daysAlive = computed(() =>
    Math.max(
      0,
      Math.floor((this.clock.now().getTime() - new Date(this.birthDate()).getTime()) / 86_400_000),
    ),
  );

  /** 1 nivel por semana de vida; EXP = avance dentro de la semana actual. */
  protected readonly level = computed(() => Math.floor(this.daysAlive() / 7) + 1);
  protected readonly exp = computed(() => Math.round((this.daysAlive() % 7) / 7 * 200));
}
