import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { KittenProfile } from '../models';

interface Envelope<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class KittensService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/kittens`;

  readonly kittens = signal<KittenProfile[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadKittens(): Observable<KittenProfile[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<Envelope<KittenProfile[]>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap({
        next: (kittens) => {
          this.kittens.set(kittens);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los gatitos. Intenta de nuevo.');
          this.loading.set(false);
        },
      }),
    );
  }

  imageUrl(kitten: KittenProfile): string | null {
    if (kitten.imageUrl) return kitten.imageUrl;
    if (kitten.imageName) return `img-cat/${kitten.imageName}`;
    return null;
  }
}
