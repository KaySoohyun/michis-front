import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="text-xl font-bold text-gray-900">🐱 Michis Galácticos</a>
          </div>

          <div class="flex items-center space-x-4">
            @if (authService.isAuthenticated()) {
              <span class="text-sm text-gray-700">{{ authService.user()?.name }}</span>
              <button
                (click)="authService.logout()"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                Cerrar Sesión
              </button>
            } @else {
              <a routerLink="/auth/login" class="text-sm text-gray-500 hover:text-gray-700">Iniciar Sesión</a>
              <a routerLink="/auth/register" class="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">Registrarse</a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
}
