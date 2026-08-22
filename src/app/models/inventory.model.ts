export enum ItemType {
  FOOD = 'FOOD',
  TOY = 'TOY',
  CLOTHING = 'CLOTHING',
  MEDICINE = 'MEDICINE',
  SPECIAL = 'SPECIAL',
}

export enum Rarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: Rarity;
  price: number;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  statsBoost: Record<string, number>;
  createdAt: string;
}

export interface UserInventory {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  isEquipped: boolean;
  acquiredAt: string;
  item: InventoryItem;
}

export interface ApiEnvelope<T> {
  data: T;
}

export interface ShopCatalogEnvelope {
  data: {
    items: InventoryItem[];
    userCoins: number;
  };
}

export interface BuyRequest {
  itemId: string;
  quantity: number;
}

export interface BuyResponse {
  success: boolean;
  remainingCoins: number;
  purchasedItem: { id: string; name: string; quantity: number };
}
