import { Component, computed, input } from '@angular/core';

export type StatKind = 'hearts' | 'squares';

@Component({
  selector: 'app-status-meter',
  template: `
    <div class="flex items-center justify-between gap-2">
      <span class="flex items-center gap-1.5 font-display text-sm tracking-wider text-white/90">
        @if (icon(); as iconGlyph) {
          <span aria-hidden="true">{{ iconGlyph }}</span>
        }
        {{ label() }}
      </span>
      <span class="flex gap-1" role="img" [attr.aria-label]="ariaLabel()">
        @for (filled of cells(); track $index) {
          <span
            class="inline-block size-3.5 border-2 border-white/80 text-[10px] leading-none"
            [class]="filled ? cellOnClass() : 'bg-transparent'"
            aria-hidden="true"
          >
            @if (kind() === 'hearts' && filled) {
              <span class="-mt-0.5 block text-center text-danger">♥</span>
            }
          </span>
        }
      </span>
      <span class="sr-only">{{ value() }} de 100</span>
    </div>
  `,
})
export class StatusMeterComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly kind = input<StatKind>('squares');
  readonly icon = input<string | null>(null);

  protected readonly cells = computed(() => {
    const filled = Math.round(Math.min(100, Math.max(0, this.value())) / 20);
    return Array.from({ length: 5 }, (_, i) => i < filled);
  });

  protected readonly ariaLabel = computed(() => `${this.label()}: ${this.value()} de 100`);

  protected cellOnClass(): string {
    return this.kind() === 'hearts' ? 'bg-white/10' : 'bg-success';
  }
}
