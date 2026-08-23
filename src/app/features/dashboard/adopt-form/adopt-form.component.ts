import { Component, computed, inject, output } from '@angular/core';
import { CatStore } from '../../../services/cat.store';

@Component({
  selector: 'app-adopt-form',
  template: `
    <div class="pixel-frame bg-[hsl(230_25%_10%)] p-4 font-body">
      <h2 class="mb-4 font-display text-lg tracking-widest text-white">NUEVO MICHI</h2>

      <form (submit)="onSubmit($event)" class="space-y-4">
        <div>
          <label for="name" class="mb-1 block font-display text-sm tracking-wider text-white/80">
            NOMBRE
          </label>
          <input
            id="name"
            type="text"
            required
            maxlength="30"
            autocomplete="off"
            placeholder="Luna Estelar"
            class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>

        <div>
          <label for="slot" class="mb-1 block font-display text-sm tracking-wider text-white/80">
            SLOT
          </label>
          <select
            id="slot"
            class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-accent"
          >
            @for (slot of slotOptions(); track slot) {
              <option [value]="slot" class="bg-[hsl(230_25%_10%)]">Slot {{ slot }}</option>
            }
          </select>
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            [disabled]="catStore.loading()"
            class="flex-1 border-2 border-white/70 bg-[hsl(262_83%_58%)] px-4 py-2 font-display tracking-wider text-white hover:bg-[hsl(262_83%_65%)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent"
          >
            {{ catStore.loading() ? 'ADOPTANDO...' : 'ADOPTAR 🐱' }}
          </button>
          <button
            type="button"
            (click)="onCancel.emit()"
            class="border-2 border-white/70 bg-[hsl(230_20%_20%)] px-4 py-2 font-display tracking-wider text-white hover:bg-[hsl(230_20%_26%)] focus-visible:outline-2 focus-visible:outline-accent"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AdoptFormComponent {
  readonly catStore = inject(CatStore);
  readonly onCancel = output<void>();

  readonly slotOptions = computed(() => {
    const cats = this.catStore.cats();
    return [1, 2, 3].filter((n) => !cats.some((c) => c.slotNumber === n));
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const slotNumber = parseInt((form.elements.namedItem('slot') as HTMLSelectElement).value, 10);

    this.catStore.adoptCat({ name, slotNumber });
    form.reset();
  }
}