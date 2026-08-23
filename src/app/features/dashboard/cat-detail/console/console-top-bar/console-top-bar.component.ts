import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClockService } from '../../../../../services/clock.service';

@Component({
  selector: 'app-console-top-bar',
  imports: [DatePipe],
  template: `
    <header
      class="flex items-center justify-between gap-2 border-b-4 border-white/70 bg-[hsl(230_25%_15%)] px-3 py-1.5 font-display text-base tracking-wider text-white"
    >
      <time>{{ clock.now() | date: 'dd/MM/yyyy' }}</time>
      <span class="truncate px-2 text-lg" [title]="name()">{{ name() }}</span>
      <time>{{ clock.now() | date: 'HH:mm' }}</time>
    </header>
  `,
})
export class ConsoleTopBarComponent implements OnInit, OnDestroy {
  private readonly clockService = inject(ClockService);

  protected readonly clock = this.clockService;

  readonly name = input.required<string>();

  ngOnInit(): void {
    this.clockService.start();
  }

  ngOnDestroy(): void {
    this.clockService.stop();
  }
}
