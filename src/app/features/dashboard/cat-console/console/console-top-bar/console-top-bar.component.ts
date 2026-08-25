import { Component, OnDestroy, OnInit, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClockService } from '../../../../../services/clock.service';
import { MAX_EXP, expProgress, levelFor } from '../../../../../shared/level';

@Component({
  selector: 'app-console-top-bar',
  imports: [DatePipe],
  template: `
    <header
      class="flex items-center justify-between gap-2 border-b-4 border-white/70 bg-[hsl(230_25%_15%)] px-3 py-1.5 font-display text-base tracking-wider text-white"
    >
      <span class="flex items-center gap-1.5">
        <span>LV.{{ level() }}</span>
        <span
          class="flex h-2 w-16 border-2 border-white/80"
          role="progressbar"
          [attr.aria-valuenow]="exp()"
          aria-valuemin="0"
          [attr.aria-valuemax]="maxExp"
          [attr.aria-label]="'Experiencia decorativa: nivel ' + level()"
        >
          <span class="block bg-accent" [style.width.%]="(exp() / maxExp) * 100"></span>
        </span>
      </span>
      <span class="truncate px-2 text-lg" [title]="name()">{{ name() }}</span>
      <time>{{ clock.now() | date: 'HH:mm' }}</time>
    </header>
  `,
})
export class ConsoleTopBarComponent implements OnInit, OnDestroy {
  private readonly clockService = inject(ClockService);

  protected readonly clock = this.clockService;
  protected readonly maxExp = MAX_EXP;

  readonly name = input.required<string>();
  readonly birthDate = input.required<string>();

  protected readonly level = computed(() => levelFor(this.birthDate(), this.clock.now()));
  protected readonly exp = computed(() => expProgress(this.birthDate(), this.clock.now()));

  ngOnInit(): void {
    this.clockService.start();
  }

  ngOnDestroy(): void {
    this.clockService.stop();
  }
}
