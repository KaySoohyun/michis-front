import { Component, inject, OnInit, signal } from '@angular/core';
import { CatStore } from '../../services/cat.store';
import { CatCardComponent } from './cat-card/cat-card.component';
import { AdoptFormComponent } from './adopt-form/adopt-form.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  imports: [CatCardComponent, AdoptFormComponent, SkeletonComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Mis Michis</h1>
        @if (catStore.availableSlots() > 0 && !showAdoptForm()) {
          <button
            (click)="showAdoptForm.set(true)"
            class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Adoptar michi ({{ catStore.availableSlots() }} slots)
          </button>
        }
      </div>

      @if (showAdoptForm()) {
        <div class="mb-6">
          <app-adopt-form (onCancel)="showAdoptForm.set(false)" />
        </div>
      }

      @if (catStore.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of [1, 2, 3]; track i) {
            <app-skeleton />
          }
        </div>
      } @else if (catStore.error()) {
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {{ catStore.error() }}
        </div>
      } @else if (catStore.cats().length === 0) {
        <div class="text-center py-12">
          <p class="text-gray-500 text-lg mb-4">No tienes michis aún</p>
          <button
            (click)="showAdoptForm.set(true)"
            class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Adoptar tu primer michi 🐱
          </button>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (cat of catStore.cats(); track cat.id) {
            <app-cat-card [cat]="cat" (onRelease)="onRelease($event)" />
          }
        </div>
      }
    </div>
  `,
})
export default class DashboardComponent implements OnInit {
  readonly catStore = inject(CatStore);
  readonly showAdoptForm = signal(false);

  ngOnInit(): void {
    this.catStore.loadCats();
  }

  onRelease(catId: string): void {
    if (confirm('¿Estás seguro de liberar a este michi?')) {
      this.catStore.releaseCat(catId);
    }
  }
}
