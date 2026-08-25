import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center px-4 py-8">
      <div class="pixel-frame w-full max-w-md bg-[hsl(230_25%_10%)] p-6 font-body sm:p-8">
        <div class="mb-6 text-center">
          <div class="mb-2 text-4xl" aria-hidden="true">🐱</div>
          <h1 class="font-display text-3xl tracking-widest text-white">MICHIS</h1>
          <p class="font-display text-xl tracking-widest text-accent">INTERGALÁCTICOS</p>
        </div>

        @if (authService.error()) {
          <p
            class="mb-4 border-2 border-[hsl(0_84%_60%)] bg-[hsl(0_60%_40%)] px-3 py-2 text-sm text-white"
            role="alert"
          >
            {{ authService.error() }}
          </p>
        }

        <form (submit)="onSubmit($event)" class="space-y-4">
          <div>
            <label for="name" class="mb-1 block font-display text-sm tracking-wider text-white/80">
              NOMBRE
            </label>
            <input
              id="name"
              type="text"
              required
              autocomplete="name"
              class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div>
            <label for="email" class="mb-1 block font-display text-sm tracking-wider text-white/80">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              required
              autocomplete="email"
              class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div>
            <label for="password" class="mb-1 block font-display text-sm tracking-wider text-white/80">
              CONTRASEÑA
            </label>
            <input
              id="password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              class="w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          <button
            type="submit"
            [disabled]="authService.loading()"
            class="pixel-btn w-full border-2 border-white/70 bg-[hsl(262_83%_58%)] px-4 py-1.5 font-display text-sm tracking-widest text-white hover:bg-[hsl(262_83%_65%)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent"
          >
            {{ authService.loading() ? 'CREANDO...' : 'CREAR CUENTA' }}
          </button>

          <p class="text-center text-sm text-white/70">
            ¿Ya tienes cuenta?
            <a
              routerLink="/auth/login"
              class="text-accent underline hover:text-[hsl(45_93%_55%)]"
            >INICIA SESIÓN</a>
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

    this.authService.register({ email, password, displayName: name }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
    });
  }
}