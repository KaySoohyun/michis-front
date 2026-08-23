import { Component, input, output } from '@angular/core';

export type ConsoleAction = 'feed' | 'clean' | 'sleep' | 'play';

@Component({
  selector: 'app-action-bar',
  template: `
    <div
      class="grid grid-cols-4 gap-2 border-t-4 border-white/70 bg-[hsl(230_25%_15%)] p-2 font-body"
      role="toolbar"
      aria-label="Acciones de cuidado"
    >
      @for (btn of buttons; track btn.action) {
        <button
          type="button"
          (click)="action.emit(btn.action)"
          [disabled]="disabled()"
          [attr.aria-label]="btn.aria"
          class="flex min-h-11 flex-col items-center justify-center gap-0.5 border-2 border-white/70 bg-[hsl(230_20%_20%)] px-1 text-white hover:bg-[hsl(262_50%_35%)] focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span class="text-lg leading-none" aria-hidden="true">{{ btn.icon }}</span>
          <span class="text-[10px] uppercase leading-none tracking-wider">{{ btn.label }}</span>
        </button>
      }
    </div>
  `,
})
export class ActionBarComponent {
  readonly action = output<ConsoleAction>();
  readonly disabled = input(false);

  protected readonly buttons = [
    { action: 'feed' as const, icon: '🍽️', label: 'Alimentar', aria: 'Alimentar al michi' },
    { action: 'clean' as const, icon: '🧼', label: 'Limpiar', aria: 'Limpiar al michi' },
    { action: 'sleep' as const, icon: '😴', label: 'Dormir', aria: 'Dormir al michi' },
    { action: 'play' as const, icon: '🎮', label: 'Jugar', aria: 'Jugar con el michi' },
  ];
}
