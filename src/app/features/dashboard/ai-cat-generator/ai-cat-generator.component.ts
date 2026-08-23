import { Component, inject, signal } from '@angular/core';
import { AiService } from '../../../services/ai.service';
import { CatStore } from '../../../services/cat.store';
import { GeneratedCat } from '../../../models';

@Component({
  selector: 'app-ai-cat-generator',
  template: `
    <div class="mx-auto max-w-2xl px-4 py-8 font-body sm:px-6">
      <h1 class="mb-6 font-display text-2xl tracking-[0.2em] text-white">GENERADOR CÓSMICO</h1>

      <div class="pixel-frame bg-[hsl(230_25%_10%)] p-6">
        <h2 class="mb-4 font-display text-lg tracking-wider text-accent">
          🔮 GENERAR MICHIS ÚNICOS
        </h2>

        <form (submit)="onGenerate($event)" class="mb-6 space-y-4">
          <div>
            <label for="theme" class="mb-1 block font-display text-sm tracking-wider text-white/80">
              TEMÁTICA (OPCIONAL)
            </label>
            <input
              id="theme"
              type="text"
              autocomplete="off"
              placeholder="Ej: volcánico, acuático, celeste..."
              class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <div>
            <label for="difficulty" class="mb-1 block font-display text-sm tracking-wider text-white/80">
              RAREZA
            </label>
            <select
              id="difficulty"
              class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-accent"
            >
              <option value="common" class="bg-[hsl(230_25%_10%)]">Común</option>
              <option value="rare" class="bg-[hsl(230_25%_10%)]">Raro</option>
              <option value="legendary" class="bg-[hsl(230_25%_10%)]">Legendario</option>
            </select>
          </div>

          <button
            type="submit"
            [disabled]="aiService.loading()"
            class="w-full border-2 border-white/70 bg-[hsl(262_83%_58%)] px-4 py-2 font-display tracking-widest text-white hover:bg-[hsl(262_83%_65%)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent"
          >
            @if (aiService.loading()) {
              GENERANDO...
            } @else {
              GENERAR ✨
            }
          </button>
        </form>

        @if (generatedCat(); as cat) {
          <div class="border-t-2 border-white/40 pt-5">
            <div class="mb-4 flex items-center gap-4">
              <div
                class="grid size-16 place-items-center rounded-full text-3xl"
                [style.background-color]="cat.suggestedColorPalette[0] || '#6d5bd0'"
                aria-hidden="true"
              >
                🐱
              </div>
              <div>
                <h3 class="font-display text-xl text-white">{{ cat.name }}</h3>
                <p class="text-sm text-white/70">{{ cat.species }}</p>
              </div>
            </div>

            <div class="mb-4 space-y-3 text-sm">
              <div>
                <span class="font-display tracking-wider text-white/80">PERSONALIDAD:</span>
                <p class="text-white/70">{{ cat.personality }}</p>
              </div>
              <div>
                <span class="font-display tracking-wider text-white/80">HISTORIA:</span>
                <p class="text-white/70">{{ cat.lore }}</p>
              </div>
              <div>
                <span class="font-display tracking-wider text-white/80">APARIENCIA:</span>
                <p class="text-white/70">{{ cat.appearanceDescription }}</p>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                (click)="onAdopt(cat)"
                class="flex-1 border-2 border-white/70 bg-[hsl(262_83%_58%)] px-4 py-2 font-display tracking-wider text-white hover:bg-[hsl(262_83%_65%)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                ADOPTAR ESTE MICHI
              </button>
              <button
                type="button"
                (click)="onClear()"
                class="border-2 border-white/70 bg-[hsl(230_20%_20%)] px-4 py-2 font-display tracking-wider text-white hover:bg-[hsl(230_20%_26%)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                LIMPIAR
              </button>
            </div>
          </div>
        }
      </div>
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
    const difficulty = (form.elements.namedItem('difficulty') as HTMLSelectElement).value as
      | 'common'
      | 'rare'
      | 'legendary';

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