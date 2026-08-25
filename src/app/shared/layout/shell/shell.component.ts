import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavRailComponent } from '../nav-rail/nav-rail.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavRailComponent, ProfileCardComponent],
  template: `
    <div class="min-h-screen md:pr-20">
      <app-profile-card />
      <main class="px-3 pt-20 sm:px-6 md:pb-8 md:pl-6 lg:px-10">
        <router-outlet />
      </main>
      <app-nav-rail />
    </div>
  `,
})
export class ShellComponent { }
