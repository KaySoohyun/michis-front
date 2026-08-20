# 005 · Imágenes, Polish y Despliegue — Spec

## Resumen
Integración Cloudinary para upload de imágenes, polish visual (animaciones, responsive), testing y optimización.

## Endpoints
- `POST /api/v1/upload` → multipart/form-data → `{ publicUrl, secureUrl, thumbnailUrl, originalName, size }`

## UI
- Upload de avatar para michis
- Animaciones de transición entre vistas
- Responsive design completo
- Testing unitario de componentes principales
