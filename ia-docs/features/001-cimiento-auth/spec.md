# 001 · Cimiento y Autenticación (Frontend)

**Estado:** propuesta

## Qué hace

Establece la base del frontend Angular 22: estructura de directorios, modelos TypeScript, servicio de auth con JWT, interceptores de auth/error, auth guard, layout shell con navbar, y routing lazy-loaded.

## Criterios de aceptación

### Core
- [ ] Estructura de directorios: core/, features/, shared/, services/, models/
- [ ] Modelos TypeScript: User, Cat, InventoryItem, etc.
- [ ] Environment config para API_URL
- [ ] Proxy config para /api → localhost:3000

### Auth
- [ ] AuthService con login(), register(), logout(), getToken(), isAuthenticated()
- [ ] Auth interceptor agrega Bearer token a requests
- [ ] Error interceptor maneja 401 → redirect a login
- [ ] AuthGuard protege rutas privadas
- [ ] Login page con formulario reactivo
- [ ] Register page con formulario reactivo

### Layout
- [ ] App shell con navbar y router-outlet
- [ ] Navbar muestra estado autenticado/no autenticado
- [ ] Rutas lazy-loaded: login, register, dashboard (placeholder)

## Fuera de alcance

- Dashboard y cat cards → feature 002
- Tienda → feature 003
- Trivia → feature 004
