# 003 · Tienda e Inventario — Spec

## Resumen
Catálogo de ítems filtrable, compra con monedas, inventario del usuario, equipar/desequipar ítems en michis.

## Endpoints
- `GET /api/v1/shop/items` → Catálogo con filtros `?type=FOOD&rarity=COMMON` + `userCoins`
- `POST /api/v1/shop/buy` → Comprar `{ itemId, quantity }` → `{ success, remainingCoins, inventoryItem }`
- `GET /api/v1/inventory` → Inventario del usuario `{ items: (UserInventory & { item: InventoryItem })[] }`
- `POST /api/v1/inventory/equip` → Equipar/Desequipar `{ inventoryItemId, catId }` → `{ success, equippedState }`

## Models
- `InventoryItem`: id, name, type (FOOD|TOY|CLOTHING|MEDICINE|SPECIAL), rarity (COMMON|RARE|LEGENDARY), price, description, imageUrl
- `UserInventory`: id, userId, itemId, quantity, equipped, equippedCatId

## UI
- Shop: grid de item-cards, filtros por tipo y rareza, botón de compra
- Inventory: lista de ítems poseídos, botón equipar/desequipar
- Monedas visibles en navbar
