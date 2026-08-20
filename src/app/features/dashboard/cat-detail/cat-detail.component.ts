import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CatStore } from '../../../services/cat.store';
import { Cat, CatStatus } from '../../../models';
import { StatBarComponent } from '../../../shared/components/stat-bar/stat-bar.component';

@Component({
  selector: 'app-cat-detail',
  imports: [StatBarComponent],
  template: `
    @if (cat(); as cat) {
      <div class="max-w-2xl mx-auto p-6">
        <button (click)="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 text-sm">
          ← Volver al dashboard
        </button>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              🐱
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ cat.name }}</h1>
              <p class="text-gray-600">{{ cat.species }} · {{ cat.personality }} · Nv. {{ cat.level }}</p>
            </div>
          </div>

          @if (status(); as status) {
            <div class="mb-6 p-3 rounded-md" [class]="status.isCritical ? 'bg-red-50 border border-red-200' : 'bg-gray-50'">
              <p class="text-sm" [class]="status.isCritical ? 'text-red-700' : 'text-gray-600'">
                @if (status.isCritical) {
                  ⚠️ ¡{{ cat.name }} necesita atención urgente!
                } @else if (status.isHungry) {
                  🍽️ {{ cat.name }} tiene hambre
                } @else if (status.isTired) {
                  😴 {{ cat.name }} está cansado
                } @else if (status.isSad) {
                  😿 {{ cat.name }} está triste
                } @else if (status.isDirty) {
                  🧼 {{ cat.name }} necesita un baño
                } @else {
                  ✨ {{ cat.name }} está feliz y saludable
                }
              </p>
            </div>
          }

          <div class="space-y-3 mb-6">
            <app-stat-bar label="Hambre" [value]="cat.hunger" />
            <app-stat-bar label="Energía" [value]="cat.energy" />
            <app-stat-bar label="Felicidad" [value]="cat.happiness" />
            <app-stat-bar label="Limpieza" [value]="cat.cleanliness" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              (click)="onFeed()"
              [disabled]="!canPerformAction()"
              class="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🍽️ Alimentar
            </button>
            <button
              (click)="onPlay()"
              [disabled]="!canPerformAction()"
              class="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎮 Jugar
            </button>
            <button
              (click)="onClean()"
              [disabled]="!canPerformAction()"
              class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🧼 Limpiar
            </button>
            <button
              (click)="onSleep()"
              [disabled]="!canPerformAction()"
              class="py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              😴 Dormir
            </button>
          </div>
        </div>
      </div>
    } @else {
      <div class="text-center py-12 text-gray-500">Cargando michi...</div>
    }
  `,
})
export class CatDetailComponent implements OnInit {
  private readonly catStore = inject(CatStore);
  private readonly router = inject(Router);

  readonly catId = input.required<string>();

  readonly cat = this.catStore.selectedCat;
  readonly status = this.catStore.catStatus;

  ngOnInit(): void {
    this.catStore.selectCat(this.catId());
  }

  canPerformAction(): boolean {
    const cat = this.cat();
    return !!cat && cat.energy > 0;
  }

  onFeed(): void {
    const cat = this.cat();
    if (cat) {
      this.catStore.feedCat(cat.id, '');
    }
  }

  onPlay(): void {
    const cat = this.cat();
    if (cat) {
      this.catStore.playWithCat(cat.id);
    }
  }

  onClean(): void {
    const cat = this.cat();
    if (cat) {
      this.catStore.cleanCat(cat.id);
    }
  }

  onSleep(): void {
    const cat = this.cat();
    if (cat) {
      this.catStore.sleepCat(cat.id, 30);
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
