import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-6">
            <a routerLink="/dashboard" class="text-xl font-bold text-gray-900">🐱 Michis</a>
            <a routerLink="/dashboard"
               routerLinkActive="text-blue-600"
               class="text-sm text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
            <a routerLink="/dashboard/shop"
               routerLinkActive="text-blue-600"
               class="text-sm text-gray-600 hover:text-gray-900">
              Tienda
            </a>
            <a routerLink="/dashboard/inventory"
               routerLinkActive="text-blue-600"
               class="text-sm text-gray-600 hover:text-gray-900">
              Inventario
            </a>
            <a routerLink="/dashboard/trivia"
               routerLinkActive="text-blue-600"
               class="text-sm text-gray-600 hover:text-gray-900">
              Trivia
            </a>
            <a routerLink="/dashboard/ai-generator"
               routerLinkActive="text-blue-600"
               class="text-sm text-gray-600 hover:text-gray-900">
              Generar Michi
            </a>
          </div>

          <div class="flex items-center space-x-4">
            @if (authService.isAuthenticated()) {
              <span class="text-sm font-medium text-yellow-600">💰 {{ userService.coins() }}</span>
              <span class="text-sm text-gray-700">{{ authService.user()?.name }}</span>
              <button
                (click)="authService.logout()"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                Salir
              </button>
            } @else {
              <a routerLink="/auth/login" class="text-sm text-gray-500 hover:text-gray-700">Iniciar Sesión</a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
}
