import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 class="text-center text-3xl font-bold text-gray-900">Michis Galácticos</h1>
          <h2 class="mt-2 text-center text-sm text-gray-600">Crear Cuenta</h2>
        </div>

        @if (authService.error()) {
          <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {{ authService.error() }}
          </div>
        }

        <form (submit)="onSubmit($event)" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                id="name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                id="password"
                type="password"
                required
                minlength="8"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            [disabled]="authService.loading()"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            @if (authService.loading()) {
              Creando cuenta...
            } @else {
              Crear Cuenta
            }
          </button>

          <p class="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?
            <a routerLink="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  `,
})
export default class RegisterComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    this.authService.register({ name, email, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
    });
  }
}
