import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar />
      <main>
        <router-outlet />
      </main>
    </div>
  `,
})
export class ShellComponent {}
