import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-card',
  imports: [RouterLink],
  template: `
    @if (auth.user(); as user) {
      <aside
        class="pixel-frame fixed right-3 mt-8 z-40 w-52 bg-[hsl(230_25%_10%)] p-3 font-body text-sm"
        aria-label="Perfil de usuario"
      >
        <div class="flex items-center gap-2">
          <a
            routerLink="/dashboard"
            aria-label="Ir a mis michis"
            class="flex size-10 shrink-0 items-center justify-center border-2 border-white/70 bg-[hsl(230_20%_18%)] text-xl focus-visible:outline-2 focus-visible:outline-accent"
          >
            🐱
          </a>
          <div class="min-w-0">
            <p class="truncate text-white" [title]="user.displayName ?? user.email">
              {{ user.displayName ?? 'Michi Amigo' }}
            </p>
            <p class="truncate text-xs text-white/60" [title]="user.email">
              {{ user.email }}
            </p>
          </div>
        </div>

        <p class="mt-2 flex items-center gap-1 text-accent" aria-live="polite">
          <span aria-hidden="true">🪙</span>
          <span class="font-display text-lg leading-none">{{ coins() }}</span>
          <span class="sr-only">monedas</span>
        </p>

        <button
          type="button"
          (click)="auth.logout()"
          class="mt-2 w-full border-2 border-white/70 bg-[hsl(0_60%_40%)] px-2 py-1.5 text-xs text-white hover:bg-[hsl(0_60%_50%)] focus-visible:outline-2 focus-visible:outline-accent"
        >
          Cerrar sesión
        </button>
      </aside>
    }
  `,
})
export class ProfileCardComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly userService = inject(UserService);

  protected coins() {
    return this.userService.coins();
  }

  ngOnInit(): void {
    this.userService.loadCoins();
  }
}
