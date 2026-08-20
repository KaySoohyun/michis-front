import { Component, inject, signal } from '@angular/core';
import { AiService } from '../../../services/ai.service';
import { CatStore } from '../../../services/cat.store';
import { GeneratedCat } from '../../../models';

@Component({
  selector: 'app-ai-cat-generator',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">🔮 Generador de Michis Cósmicos</h2>

      <form (submit)="onGenerate($event)" class="space-y-4 mb-6">
        <div>
          <label for="theme" class="block text-sm font-medium text-gray-700">Temática (opcional)</label>
          <input
            id="theme"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Ej: volcánico, acuático, celeste..."
          />
        </div>

        <div>
          <label for="difficulty" class="block text-sm font-medium text-gray-700">Rareza</label>
          <select
            id="difficulty"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="common">Común</option>
            <option value="rare">Raro</option>
            <option value="legendary">Legendario</option>
          </select>
        </div>

        <button
          type="submit"
          [disabled]="aiService.loading()"
          class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          @if (aiService.loading()) {
            Generando...
          } @else {
            Generar Michi ✨
          }
        </button>
      </form>

      @if (generatedCat(); as cat) {
        <div class="border-t pt-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                 [style.background-color]="cat.suggestedColorPalette[0] || '#e0e7ff'">
              🐱
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ cat.name }}</h3>
              <p class="text-sm text-gray-600">{{ cat.species }}</p>
            </div>
          </div>

          <div class="space-y-3 mb-4">
            <div>
              <span class="text-sm font-medium text-gray-700">Personalidad:</span>
              <p class="text-sm text-gray-600">{{ cat.personality }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Historia:</span>
              <p class="text-sm text-gray-600">{{ cat.lore }}</p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Apariencia:</span>
              <p class="text-sm text-gray-600">{{ cat.appearanceDescription }}</p>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              (click)="onAdopt(cat)"
              class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Adoptar este michi
            </button>
            <button
              (click)="onClear()"
              class="py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class AiCatGeneratorComponent {
  readonly aiService = inject(AiService);
  private readonly catStore = inject(CatStore);

  readonly generatedCat = this.aiService.lastGeneratedCat;

  onGenerate(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const theme = (form.elements.namedItem('theme') as HTMLInputElement).value || undefined;
    const difficulty = (form.elements.namedItem('difficulty') as HTMLSelectElement).value as 'common' | 'rare' | 'legendary';

    this.aiService.generateCat({ theme, difficulty }).subscribe();
  }

  onAdopt(cat: GeneratedCat): void {
    const slot = this.catStore.availableSlots();
    if (slot > 0) {
      this.catStore.adoptCat({
        name: cat.name,
        slotNumber: 3 - slot + 1,
        species: cat.species,
        personality: cat.personality,
      });
      this.aiService.clearGeneratedCat();
    }
  }

  onClear(): void {
    this.aiService.clearGeneratedCat();
  }
}
