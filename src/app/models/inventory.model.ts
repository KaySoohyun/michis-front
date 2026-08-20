export enum ItemType {
  FOOD = 'FOOD',
  TOY = 'TOY',
  CLOTHING = 'CLOTHING',
  MEDICINE = 'MEDICINE',
  SPECIAL = 'SPECIAL',
}

export enum Rarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  LEGENDARY = 'LEGENDARY',
}

export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: Rarity;
  price: number;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface UserInventory {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  equipped: boolean;
  equippedCatId?: string;
  item: InventoryItem;
}

export interface ShopCatalogResponse {
  items: InventoryItem[];
  userCoins: number;
}

export interface BuyRequest {
  itemId: string;
  quantity: number;
}

export interface BuyResponse {
  success: boolean;
  remainingCoins: number;
  inventoryItem: UserInventory;
}

export interface EquipRequest {
  inventoryItemId: string;
  catId: string;
}

export interface EquipResponse {
  success: boolean;
  equippedState: boolean;
}
