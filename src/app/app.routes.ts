import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component'),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./shared/layout/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.component'),
      },
      {
        path: 'cat/:id',
        loadComponent: () => import('./features/dashboard/cat-detail/cat-detail.component').then(m => m.CatDetailComponent),
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component'),
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/inventory/inventory.component'),
      },
      {
        path: 'trivia',
        loadComponent: () => import('./features/trivia/trivia.component'),
      },
      {
        path: 'ai-generator',
        loadComponent: () => import('./features/dashboard/ai-cat-generator/ai-cat-generator.component').then(m => m.AiCatGeneratorComponent),
      },
    ],
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' },
];
