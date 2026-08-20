import { Component, inject, output, computed } from '@angular/core';
import { CatStore } from '../../../services/cat.store';

@Component({
  selector: 'app-adopt-form',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Adoptar un nuevo michi</h2>

      <form (submit)="onSubmit($event)" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre del michi</label>
          <input
            id="name"
            type="text"
            required
            maxlength="30"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Luna Estelar"
          />
        </div>

        <div>
          <label for="slot" class="block text-sm font-medium text-gray-700">Slot</label>
          <select
            id="slot"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            @for (slot of slotOptions(); track slot) {
              <option [value]="slot">Slot {{ slot }}</option>
            }
          </select>
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            [disabled]="catStore.loading() || availableSlots() === 0"
            class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            @if (catStore.loading()) {
              Adoptando...
            } @else {
              Adoptar 🐱
            }
          </button>
          <button
            type="button"
            (click)="onCancel.emit()"
            class="py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AdoptFormComponent {
  readonly catStore = inject(CatStore);
  readonly onCancel = output<void>();

  readonly availableSlots = this.catStore.availableSlots;
  readonly slotOptions = computed(() => {
    const count = this.availableSlots();
    return Array.from({ length: count }, (_, i) => i + 1);
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
