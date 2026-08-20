# 001 · Cimiento y Autenticación — Tareas

## Etapa 1 — Core setup

- [x] Crear estructura: src/app/core/, src/app/features/, src/app/shared/, src/app/services/, src/app/models/
- [x] Crear src/app/models/user.model.ts
- [x] Crear src/app/models/cat.model.ts
- [x] Crear src/app/models/api.model.ts (ApiResponse, ApiError)
- [x] Crear src/environments/environment.ts y environment.development.ts
- [x] Crear proxy.conf.json para /api → localhost:3000
- [x] Actualizar angular.json con proxy config

## Etapa 2 — Auth

- [x] Crear src/app/core/auth/auth.service.ts
- [x] Crear src/app/core/auth/auth.interceptor.ts
- [x] Crear src/app/core/auth/error.interceptor.ts
- [x] Crear src/app/core/auth/auth.guard.ts
- [x] Crear src/app/features/auth/login/login.component.ts
- [x] Crear src/app/features/auth/register/register.component.ts

## Etapa 3 — Layout + routing

- [ ] Crear src/app/shared/layout/shell/shell.component.ts
- [ ] Crear src/app/shared/layout/navbar/navbar.component.ts
- [ ] Configurar app.routes.ts con lazy loading
- [ ] Actualizar app.ts con shell layout

## Validación

- [ ] `npm start` arranca sin errores
- [ ] Login muestra formulario y navega
- [ ] Register muestra formulario y navega
- [ ] Rutas protegidas redirigen a login sin token
- [ ] Navbar muestra estado autenticado
