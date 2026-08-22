import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface RailItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-nav-rail',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="fixed z-40 font-body
             inset-x-2 bottom-2 flex justify-around border-4 border-white/70 bg-[hsl(230_25%_10%)] py-1
             md:inset-x-auto md:right-3 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:flex-col md:p-1"
      aria-label="Navegación principal"
    >
      @for (item of items; track item.path) {
        <a
          [routerLink]="item.path"
          routerLinkActive="rail-active"
          #rla="routerLinkActive"
          [attr.aria-label]="item.label"
          [title]="item.label"
          [attr.aria-current]="rla.isActive ? 'page' : null"
          class="flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-2 text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-accent md:min-h-12 md:min-w-12 md:p-2"
        >
          <span class="text-xl leading-none" aria-hidden="true">{{ item.icon }}</span>
          <span class="text-[10px] leading-none">{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    .rail-active {
      color: white;
      background-color: hsl(262 83% 58%);
    }
  `,
})
export class NavRailComponent {
  protected readonly items: RailItem[] = [
    { path: '/dashboard', icon: '🏠', label: 'Michis' },
    { path: '/dashboard/shop', icon: '🛒', label: 'Tienda' },
    { path: '/dashboard/inventory', icon: '🎒', label: 'Inventario' },
    { path: '/dashboard/trivia', icon: '🎓', label: 'Trivia' },
    { path: '/dashboard/ai-generator', icon: '✨', label: 'Generar' },
  ];
}
