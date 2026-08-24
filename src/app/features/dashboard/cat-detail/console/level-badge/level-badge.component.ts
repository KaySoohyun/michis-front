import { Component, computed, inject, input } from '@angular/core';
import { ClockService } from '../../../../../services/clock.service';
import { MAX_EXP, expProgress, levelFor } from '../../../../../shared/level';

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
        [attr.aria-valuemax]="maxExp"
        [attr.aria-label]="'Experiencia decorativa: nivel ' + level()"
      >
        <div class="bg-accent" [style.width.%]="(exp() / maxExp) * 100"></div>
      </div>
      <p class="text-xs text-white/70">EXP {{ exp() }}/{{ maxExp }}</p>
    </div>
  `,
})
export class LevelBadgeComponent {
  private readonly clock = inject(ClockService);

  readonly birthDate = input.required<string>();

  protected readonly maxExp = MAX_EXP;

  protected readonly level = computed(() => levelFor(this.birthDate(), this.clock.now()));
  protected readonly exp = computed(() => expProgress(this.birthDate(), this.clock.now()));
}
