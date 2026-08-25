import { Component, input, output } from '@angular/core';

export type ConsoleAction = 'feed' | 'clean' | 'sleep' | 'play';

interface ActionButton {
  action: ConsoleAction | null;
  viewBox: string;
  label: string;
  aria: string;
}

@Component({
  selector: 'app-action-bar',
  template: `
    <div
      class="grid grid-cols-5 gap-1.5 border-t-4 border-white/70 bg-[hsl(230_25%_15%)] p-2 font-body"
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
          class="pixel-btn flex min-h-14 flex-col items-center justify-center gap-1 border-2 border-white/70 bg-[hsl(230_20%_20%)] px-1 py-1.5 text-white hover:bg-[hsl(262_50%_35%)] focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            [attr.viewBox]="btn.viewBox"
            class="size-8 text-white"
            fill="currentColor"
            aria-hidden="true"
          >
            @switch (btn.action) {
              @case (null) {
                <g>
                  <path d="M30.47 1.53H32v15.24h-1.53Z"/>
                  <path d="m28.95 19.81 -1.52 0 0 1.53 3.04 0 0 -4.57 -1.52 0 0 3.04z"/>
                  <path d="M25.9 18.29h1.53v1.52H25.9Z"/>
                  <path d="M24.38 12.19h4.57v1.53h-4.57Z"/>
                  <path d="M24.38 9.15h4.57v1.52h-4.57Z"/>
                  <path d="M25.9 6.1h3.05v1.52H25.9Z"/>
                  <path d="M21.33 3.05h7.62v1.53h-7.62Z"/>
                  <path d="M24.38 16.77h1.52v1.52h-1.52Z"/>
                  <path d="m22.86 15.24 0 -4.57 -1.53 0 0 15.24 1.53 0 0 -9.14 1.52 0 0 -1.53 -1.52 0z"/>
                  <path d="M12.19 6.1h12.19v1.52H12.19Z"/>
                  <path d="M15.24 25.91h6.09v1.52h-6.09Z"/>
                  <path d="M15.24 3.05h4.57v1.53h-4.57Z"/>
                  <path d="M4.57 13.72v9.14h13.71v-9.14Zm12.19 3.05h-1.52v1.52h-1.53v1.52H9.14v-1.52H7.62v-1.52H6.09v-1.53h1.53v1.53h1.52v1.52h4.57v-1.52h1.53v-1.53h1.52Z"/>
                  <path d="m13.71 30.48 -1.52 0 0 1.52 3.05 0 0 -4.57 -1.53 0 0 3.05z"/>
                  <path d="M12.19 3.05h1.52v1.53h-1.52Z"/>
                  <path d="M10.66 0h19.81v1.53H10.66Z"/>
                  <path d="M10.66 28.96h1.53v1.52h-1.53Z"/>
                  <path d="M9.14 27.43h1.52v1.53H9.14Z"/>
                  <path d="M1.52 25.91h7.62v1.52H1.52Z"/>
                  <path d="m21.33 10.67 0 -1.52 -10.67 0 0 -7.62 -1.52 0 0 7.62 -7.62 0 0 1.52 19.81 0z"/>
                  <path d="M0 10.67h1.52v15.24H0Z"/>
                </g>
              }
              @case ('feed') {
                <g>
                  <path d="m30.47 19.05 -1.52 0 0 -1.53 -1.53 0 0 1.53 -1.52 0 0 1.52 -3.05 0 0 -1.52 -1.52 0 0 -1.53 -4.57 0 0 1.53 -3.05 0 0 1.52 -4.57 0 0 -1.52 -1.53 0 0 -1.53 -4.57 0 0 1.53 -1.52 0 0 1.52 1.52 0 0 4.57 1.53 0 0 -3.05 22.85 0 0 3.05 1.53 0 0 -3.05 1.52 0 0 -1.52 1.53 0L32 16l-1.53 0 0 3.05z"/>
                  <path d="M25.9 25.14h1.52v1.53H25.9Z"/>
                  <path d="M25.9 8.38h1.52V9.9H25.9Z"/>
                  <path d="M24.38 6.86h1.52v1.52h-1.52Z"/>
                  <path d="M6.09 26.67H25.9v1.52H6.09Z"/>
                  <path d="M21.33 8.38h1.52V9.9h-1.52Z"/>
                  <path d="M21.33 5.33h3.05v1.53h-3.05Z"/>
                  <path d="M18.28 9.9h1.53v1.53h-1.53Z"/>
                  <path d="M18.28 6.86h1.53v1.52h-1.53Z"/>
                  <path d="M15.23 8.38h1.53V9.9h-1.53Z"/>
                  <path d="M12.19 9.9h1.52v1.53h-1.52Z"/>
                  <path d="M12.19 6.86h1.52v1.52h-1.52Z"/>
                  <path d="M10.66 3.81h10.67v1.52H10.66Z"/>
                  <path d="M9.14 8.38h1.52V9.9H9.14Z"/>
                  <path d="M7.61 5.33h3.05v1.53H7.61Z"/>
                  <path d="M6.09 6.86h1.52v1.52H6.09Z"/>
                  <path d="M4.57 25.14h1.52v1.53H4.57Z"/>
                  <path d="M4.57 8.38h1.52V9.9H4.57Z"/>
                  <path d="m30.47 16 0 -1.53 -1.52 0 0 -4.57 -1.53 0 0 4.57 -22.85 0 0 -4.57 -1.53 0 0 4.57 -1.52 0 0 1.53 28.95 0z"/>
                  <path d="M0 16h1.52v3.05H0Z"/>
                </g>
              }
              @case ('play') {
                <g>
                  <path d="M30.47 8.38H32V16h-1.53Z"/>
                  <path d="M28.95 16h1.52v3.05h-1.52Z"/>
                  <path d="M28.95 6.86h1.52v1.52h-1.52Z"/>
                  <path d="M27.43 19.05h1.52v1.52h-1.52Z"/>
                  <path d="M27.43 9.9h1.52v3.05h-1.52Z"/>
                  <path d="M27.43 5.33h1.52v1.53h-1.52Z"/>
                  <path d="M25.9 8.38h1.53V9.9H25.9Z"/>
                  <path d="M24.38 20.57h3.05v1.52h-3.05Z"/>
                  <path d="M22.85 6.86h3.05v1.52h-3.05Z"/>
                  <path d="M21.33 22.09h3.05v1.53h-3.05Z"/>
                  <path d="M19.81 3.81h7.62v1.52h-7.62Z"/>
                  <path d="M18.28 23.62h3.05v1.52h-3.05Z"/>
                  <path d="M18.28 5.33h1.53v1.53h-1.53Z"/>
                  <path d="M16.76 25.14h1.52v1.52h-1.52Z"/>
                  <path d="M16.76 6.86h1.52v1.52h-1.52Z"/>
                  <path d="M15.24 26.66h1.52v1.53h-1.52Z"/>
                  <path d="M15.24 8.38h1.52V9.9h-1.52Z"/>
                  <path d="M13.71 25.14h1.53v1.52h-1.53Z"/>
                  <path d="M13.71 6.86h1.53v1.52h-1.53Z"/>
                  <path d="M10.66 23.62h3.05v1.52h-3.05Z"/>
                  <path d="M12.19 5.33h1.52v1.53h-1.52Z"/>
                  <path d="M7.62 22.09h3.04v1.53H7.62Z"/>
                  <path d="M4.57 20.57h3.05v1.52H4.57Z"/>
                  <path d="M4.57 3.81h7.62v1.52H4.57Z"/>
                  <path d="M3.05 19.05h1.52v1.52H3.05Z"/>
                  <path d="M3.05 5.33h1.52v1.53H3.05Z"/>
                  <path d="M1.52 16h1.53v3.05H1.52Z"/>
                  <path d="M1.52 6.86h1.53v1.52H1.52Z"/>
                  <path d="M0 8.38h1.52V16H0Z"/>
                </g>
              }
              @case ('sleep') {
                <g>
                  <polygon points="133.3,53.3 133.3,26.7 106.7,26.7 80,26.7 80,53.3 106.7,53.3"/>
                  <polygon points="160,53.3 186.7,53.3 186.7,26.7 213.3,26.7 213.3,0 186.7,0 160,0 133.3,0 133.3,26.7 160,26.7"/>
                  <rect height="26.7" width="26.7" x="53.3" y="53.3"/>
                  <rect height="26.7" width="26.7" x="133.3" y="53.3"/>
                  <polygon points="106.7,106.7 106.7,133.3 106.7,160 106.7,186.7 106.7,213.3 133.3,213.3 133.3,186.7 133.3,160 133.3,133.3 133.3,106.7 133.3,80 106.7,80"/>
                  <polygon points="53.3,106.7 53.3,80 26.7,80 26.7,106.7 26.7,133.3 53.3,133.3"/>
                  <polygon points="373.3,186.7 373.3,213.3 346.7,213.3 346.7,240 373.3,240 373.3,266.7 400,266.7 400,240 400,213.3 400,186.7"/>
                  <polygon points="26.7,213.3 26.7,186.7 26.7,160 26.7,133.3 0,133.3 0,160 0,186.7 0,213.3 0,240 0,266.7 26.7,266.7 26.7,240"/>
                  <rect height="26.7" width="26.7" x="133.3" y="213.3"/>
                  <rect height="26.7" width="26.7" x="160" y="240"/>
                  <rect height="26.7" width="26.7" x="320" y="240"/>
                  <polygon points="53.3,266.7 26.7,266.7 26.7,293.3 26.7,320 53.3,320 53.3,293.3"/>
                  <polygon points="213.3,293.3 240,293.3 266.7,293.3 293.3,293.3 320,293.3 320,266.7 293.3,266.7 266.7,266.7 240,266.7 213.3,266.7 186.7,266.7 186.7,293.3"/>
                  <polygon points="346.7,293.3 346.7,320 373.3,320 373.3,293.3 373.3,266.7 346.7,266.7"/>
                  <rect height="26.7" width="26.7" x="53.3" y="320"/>
                  <rect height="26.7" width="26.7" x="320" y="320"/>
                  <polygon points="106.7,346.7 80,346.7 80,373.3 106.7,373.3 133.3,373.3 133.3,346.7"/>
                  <polygon points="266.7,346.7 266.7,373.3 293.3,373.3 320,373.3 320,346.7 293.3,346.7"/>
                  <polygon points="213.3,373.3 186.7,373.3 160,373.3 133.3,373.3 133.3,400 160,400 186.7,400 213.3,400 240,400 266.7,400 266.7,373.3 240,373.3"/>
                </g>
              }
              @case ('clean') {
                <g>
                  <path d="m 8.38,13.72 h 1.53 v 1.52 h 1.52 v -1.52 h 1.53 v 1.52 h 1.52 V 13.72 H 16 v -1.53 h 3.05 V 10.67 H 17.53 V 9.15 H 16 V 6.1 h 3.05 v 1.52 h 1.52 V 9.15 H 22.1 V 7.62 h 6.09 v 1.53 h 1.53 V 7.62 h 1.52 V 3.05 H 29.72 V 1.53 H 28.19 V 3.05 H 22.1 V 1.53 H 20.57 V 3.05 H 19.05 V 4.57 H 12.96 V 3.05 h 1.52 V 0 H 9.91 V 1.53 H 8.38 v 1.52 h 3.05 V 4.57 H 9.91 V 6.1 h 4.57 V 7.62 H 9.91 V 6.1 H 8.38 V 9.15 H 6.86 v 1.52 H 5.34 v 1.52 H 8.38 Z M 20.57,4.57 h 9.15 V 6.1 h -9.15 z"/>
                  <path d="m 22.1,9.15 h 6.09 v 1.52 H 22.1 Z"/>
                  <path d="m 22.1,0 h 6.09 V 1.53 H 22.1 Z"/>
                  <path d="m 22.1,16.77 h 1.52 v 9.14 H 22.1 Z"/>
                  <path d="m 20.57,25.91 h 1.53 v 3.05 h -1.53 z"/>
                  <path d="m 20.57,13.72 h 1.53 v 3.05 h -1.53 z"/>
                  <path d="m 19.05,12.19 h 1.52 v 1.53 h -1.52 z"/>
                  <path d="m 17.53,28.96 h 3.04 v 1.52 h -3.04 z"/>
                  <path d="m 16,16.77 h 1.53 v 9.14 H 16 Z"/>
                  <path d="m 14.48,28.96 h -1.52 v 1.52 H 11.43 V 28.96 H 9.91 v 1.52 H 6.86 V 32 h 10.67 v -1.52 h -3.05 z"/>
                  <path d="M 14.48,25.91 H 16 v 3.05 h -1.52 z"/>
                  <path d="M 14.48,15.24 H 16 v 1.53 h -1.52 z"/>
                  <path d="m 8.38,25.91 h 1.53 v 3.05 H 8.38 Z"/>
                  <path d="m 8.38,15.24 h 1.53 v 1.53 H 8.38 Z"/>
                  <path d="m 6.86,16.77 h 1.52 v 9.14 H 6.86 Z"/>
                  <path d="m 3.81,28.96 h 3.05 v 1.52 H 3.81 Z"/>
                  <path d="M 5.34,1.53 H 6.86 V 3.05 H 5.34 Z"/>
                  <path d="m 3.81,12.19 h 1.53 v 1.53 H 3.81 Z"/>
                  <path d="m 2.29,25.91 h 1.52 v 3.05 H 2.29 Z"/>
                  <path d="m 2.29,13.72 h 1.52 v 3.05 H 2.29 Z"/>
                  <path d="M 2.29,1.53 H 3.81 V 3.05 H 2.29 Z"/>
                  <path d="m 0.76,16.77 h 1.53 v 9.14 H 0.76 Z"/>
                </g>
              }
            }
          </svg>
          <span class="text-xs uppercase leading-none tracking-wider text-white/90">{{ btn.label }}</span>
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
      viewBox: '0 0 32 32',
      label: 'Chat',
      aria: 'Hablar con el michi (próximamente)',
    },
    {
      action: 'feed',
      viewBox: '0 0 32 32',
      label: 'Comer',
      aria: 'Darle comida al michi',
    },
    {
      action: 'play',
      viewBox: '0 0 32 32',
      label: 'Jugar',
      aria: 'Jugar con el michi',
    },
    {
      action: 'sleep',
      viewBox: '0 0 400 400',
      label: 'Dormir',
      aria: 'Dormir al michi',
    },
    {
      action: 'clean',
      viewBox: '0 0 32 32',
      label: 'Acicalar',
      aria: 'Limpiar y acicalar al michi',
    },
  ];

  protected emitAction(btn: ActionButton): void {
    if (btn.action !== null) this.action.emit(btn.action);
  }
}