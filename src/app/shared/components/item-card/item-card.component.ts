import { Component, input, output } from '@angular/core';
import { InventoryItem, Rarity } from '../../../models';

@Component({
  selector: 'app-item-card',
  template: `
    <div class="pixel-frame flex h-full flex-col bg-[hsl(230_20%_12%)] p-3 font-body">
      <div class="mb-2 flex items-start justify-between">
        <div
          class="grid size-12 place-items-center bg-[hsl(230_20%_18%)] text-2xl"
          [class]="rarityBg()"
          aria-hidden="true"
        >
          🎁
        </div>
        <span
          class="px-2 py-0.5 font-display text-xs tracking-wider"
          [class]="rarityClass()"
        >
          {{ item().rarity }}
        </span>
      </div>

      <h3 class="mb-1 font-display text-lg text-white">{{ item().name }}</h3>
      <p class="mb-2 font-body text-xs uppercase tracking-wider text-white/60">{{ item().type }}</p>
      <p class="mb-3 line-clamp-2 text-sm text-white/70">{{ item().description }}</p>

      <div class="mt-auto flex items-center justify-between pt-2">
        <span class="font-display text-lg text-accent">🪙 {{ item().price }}</span>
        <button
          type="button"
          (click)="onBuy.emit(item().id)"
          class="border-2 border-white/70 bg-[hsl(262_83%_58%)] px-3 py-1.5 font-display text-sm tracking-wider text-white hover:bg-[hsl(262_83%_65%)] focus-visible:outline-2 focus-visible:outline-accent"
        >
          COMPRAR
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
      case Rarity.LEGENDARY:
        return 'bg-[hsl(271_91%_55%)] text-white';
      case Rarity.EPIC:
        return 'bg-[hsl(262_83%_45%)] text-white';
      case Rarity.RARE:
        return 'bg-[hsl(199_89%_38%)] text-white';
      case Rarity.UNCOMMON:
        return 'bg-[hsl(142_71%_35%)] text-white';
      default:
        return 'bg-[hsl(0_0%_45%)] text-white';
    }
  };

  protected readonly rarityBg = () => {
    switch (this.item().rarity) {
      case Rarity.LEGENDARY:
        return 'bg-[hsl(271_91%_40%_/_0.35)]';
      case Rarity.EPIC:
        return 'bg-[hsl(262_83%_45%_/_0.3)]';
      case Rarity.RARE:
        return 'bg-[hsl(199_89%_48%_/_0.3)]';
      case Rarity.UNCOMMON:
        return 'bg-[hsl(142_71%_45%_/_0.3)]';
      default:
        return 'bg-[hsl(0_0%_50%_/_0.2)]';
    }
  };
}