import { Component, input, output } from '@angular/core';
import { InventoryItem, Rarity } from '../../../models';

@Component({
  selector: 'app-item-card',
  template: `
    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div class="flex items-start justify-between mb-2">
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
             [class]="rarityBg()">
          🎁
        </div>
        <span class="text-xs px-2 py-1 rounded-full"
              [class]="rarityClass()">
          {{ item().rarity }}
        </span>
      </div>

      <h3 class="font-semibold text-gray-900 mb-1">{{ item().name }}</h3>
      <p class="text-xs text-gray-500 mb-2">{{ item().type }}</p>
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ item().description }}</p>

      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-yellow-600">💰 {{ item().price }}</span>
        <button
          (click)="onBuy.emit(item().id)"
          class="py-1.5 px-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Comprar
        </button>
      </div>
    </div>
  `,
})
export class ItemCardComponent {
  item = input.required<InventoryItem>();
  onBuy = output<string>();

  protected readonly rarityClass = () => {
    switch (this.item().rarity) {
      case Rarity.LEGENDARY: return 'bg-purple-100 text-purple-700';
      case Rarity.RARE: return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  protected readonly rarityBg = () => {
    switch (this.item().rarity) {
      case Rarity.LEGENDARY: return 'bg-purple-100';
      case Rarity.RARE: return 'bg-blue-100';
      default: return 'bg-gray-100';
    }
  };
}
