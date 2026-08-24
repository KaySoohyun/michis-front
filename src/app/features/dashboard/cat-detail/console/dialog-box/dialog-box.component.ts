import { Component, computed, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { Cat, CatStatus } from '../../../../../models';

const HAPPY_MESSAGES = [
  '¡Qué noche tan estrellada! Prrr...',
  '¿Sabías que los michis vemos nueve galaxias?',
  'Soñé con un ratón de cometa.',
  'Prrrrr... (motor encendido)',
  'Hoy el planeta ronronea tranquilo.',
];

@Component({
  selector: 'app-dialog-box',
  template: `
    <div
      class="pixel-frame min-h-16 bg-[hsl(230_20%_14%)] px-3 py-2 font-body text-sm text-white"
      role="status"
      aria-live="polite"
    >
      <p class="mb-1 font-display text-xs tracking-[0.2em] text-white/80">{{ cat().name }} DICE:</p>
      <p>
        <span class="mr-1 text-accent" aria-hidden="true">▼</span>{{ message() }}
      </p>
    </div>
  `,
})
export class DialogBoxComponent {
  readonly cat = input.required<Cat>();
  readonly status = input.required<CatStatus | null>();

  private readonly tick = toSignal(interval(8_000), { initialValue: 0 });

  protected readonly message = computed(() => {
    this.tick();
    const cat = this.cat();
    const status = this.status();

    if (!cat.isAlive) return 'El michi viaja entre estrellas... aliméntalo pronto para traerlo de vuelta. 🌟';
    if (status?.isCritical) return `¡Miau! Necesito ayuda urgente, ¡no me abandones!`;
    if (status?.isHungry) return 'Mi platito está vacío... ¿tienes croquetas?';
    if (status?.isTired) return '*bostezo* Una siestita cortina no me vendría mal.';
    if (status?.isSad) return 'Me aburrooo... ¿jugamos un rato?';
    if (status?.isDirty) return 'Necesito una limpieza, me siento pegajoso.';
    return HAPPY_MESSAGES[Math.floor(Math.random() * HAPPY_MESSAGES.length)];
  });
}
