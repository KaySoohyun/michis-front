import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `
    <div class="pixel-frame animate-pulse bg-[hsl(230_20%_12%)] p-3 font-body" aria-hidden="true">
      <div class="flex items-start gap-3">
        <div class="size-14 bg-[hsl(230_20%_20%)]"></div>
        <div class="flex-1 space-y-2 py-1">
          <div class="h-3 w-24 bg-[hsl(230_20%_20%)]"></div>
          <div class="h-2 w-32 bg-[hsl(230_20%_20%)]"></div>
          <div class="h-3 w-10 bg-[hsl(230_20%_20%)]"></div>
        </div>
      </div>
      <div class="mt-3 grid grid-cols-4 gap-1.5">
        @for (i of [1, 2, 3, 4]; track i) {
          <div class="h-5 bg-[hsl(230_20%_20%)]"></div>
        }
      </div>
      <div class="mt-3 h-9 bg-[hsl(230_20%_20%)]"></div>
    </div>
  `,
})
export class SkeletonComponent {}