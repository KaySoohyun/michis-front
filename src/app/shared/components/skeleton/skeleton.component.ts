import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `
    <div class="animate-pulse">
      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  `,
})
export class SkeletonComponent {}
