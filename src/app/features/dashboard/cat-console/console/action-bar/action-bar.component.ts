import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type ConsoleAction = 'feed' | 'clean' | 'sleep' | 'play';

interface ActionButton {
  action: ConsoleAction | null;
  icon: string;
  label: string;
  aria: string;
}

@Component({
  selector: 'app-action-bar',
  imports: [NgOptimizedImage],
  template: `
    <div
      class="grid grid-cols-5 gap-2 border-t-4 border-white/70 bg-[hsl(230_25%_15%)] p-2 font-body"
      role="toolbar"
      aria-label="Acciones de cuidado"
    >
      @for (btn of buttons; track btn.label) {
        <button
          type="button"
          (click)="emitAction(btn)"
          [disabled]="btn.action === null || disabled()"
          [attr.aria-label]="btn.aria"
          [title]="btn.action === null ? 'Próximamente' : null"
          class="flex min-h-20 flex-col items-center justify-center gap-1 border-2 border-white/70 bg-[hsl(230_20%_20%)] px-1 text-white hover:bg-[hsl(262_50%_35%)] focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <img
            [ngSrc]="btn.icon"
            [alt]="''"
            width="24"
            height="24"
            class="size-6 object-contain"
            aria-hidden="true"
          />
          <span class="text-[10px] uppercase leading-none tracking-wider">{{ btn.label }}</span>
        </button>
      }
    </div>
  `,
})
export class ActionBarComponent {
  readonly action = output<ConsoleAction>();
  readonly disabled = input(false);

  protected readonly buttons: ActionButton[] = [
    {
      action: null,
      icon: 'icons/chat.svg',
      label: 'Chat',
      aria: 'Hablar con el michi (próximamente)',
    },
    {
      action: 'feed',
      icon: 'icons/comer.svg',
      label: 'Comer',
      aria: 'Darle comida al michi',
    },
    {
      action: 'play',
      icon: 'icons/jugar.svg',
      label: 'Jugar',
      aria: 'Jugar con el michi',
    },
    {
      action: 'sleep',
      icon: 'icons/dormir.svg',
      label: 'Dormir',
      aria: 'Dormir al michi',
    },
    {
      action: 'clean',
      icon: 'icons/acicalar.svg',
      label: 'Acicalar',
      aria: 'Limpiar y acicalar al michi',
    },
  ];

  protected emitAction(btn: ActionButton): void {
    if (btn.action !== null) this.action.emit(btn.action);
  }
}
