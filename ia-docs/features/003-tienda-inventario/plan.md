# 003 · Tienda e Inventario — Plan

## Etapa 1 — Models y services
- Crear models: InventoryItem, UserInventory, ItemType, Rarity
- Crear ShopService con métodos catálogo, compra
- Crear InventoryService con métodos inventario, equipar

## Etapa 2 — Componentes UI
- ItemCardComponent: card de ítem con precio y rarity
- ShopComponent: grid con filtros
- InventoryComponent: lista de ítems poseídos

## Etapa 3 — Routing e integración
- Rutas lazy: /shop, /inventory
- Integrar coins en navbar
