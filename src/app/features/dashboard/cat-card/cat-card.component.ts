import { Component, input, output, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cat } from '../../../models';
import { StatBarComponent } from '../../../shared/components/stat-bar/stat-bar.component';

@Component({
  selector: 'app-cat-card',
  imports: [RouterLink, StatBarComponent],
  template: `
    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
             [class]="isCritical() ? 'bg-red-100' : 'bg-blue-100'">
          🐱
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">{{ cat().name }}</h3>
          <p class="text-xs text-gray-500">{{ cat().species }} · Nv. {{ cat().level }}</p>
        </div>
        @if (isCritical()) {
          <span class="ml-auto text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">⚠️ Crítico</span>
        }
      </div>

      <div class="space-y-2 mb-4">
        <app-stat-bar label="Hambre" [value]="cat().hunger" />
        <app-stat-bar label="Energía" [value]="cat().energy" />
        <app-stat-bar label="Felicidad" [value]="cat().happiness" />
        <app-stat-bar label="Limpieza" [value]="cat().cleanliness" />
      </div>

      <div class="flex gap-2">
        <a
          [routerLink]="['/dashboard/cat', cat().id]"
          class="flex-1 text-center py-2 px-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Ver detalle
        </a>
        <button
          (click)="onRelease.emit(cat().id)"
          class="py-2 px-3 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
        >
          Liberar
        </button>
      </div>
    </div>
  `,
})
export class CatCardComponent {
  cat = input.required<Cat>();
  onRelease = output<string>();

  protected readonly isCritical = computed(() => {
    const c = this.cat();
    return c.hunger < 10 || c.energy < 10;
  });
}
