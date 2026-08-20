import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  template: `
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-500 w-16">{{ label() }}</span>
      <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          [style.width.%]="value()"
          [class]="colorClass()"
        ></div>
      </div>
      <span class="text-xs text-gray-500 w-8 text-right">{{ value() }}%</span>
    </div>
  `,
})
export class StatBarComponent {
  label = input.required<string>();
  value = input.required<number>();

  protected readonly colorClass = computed(() => {
    const val = this.value();
    if (val < 20) return 'bg-red-500';
    if (val < 40) return 'bg-yellow-500';
    return 'bg-green-500';
  });
}
