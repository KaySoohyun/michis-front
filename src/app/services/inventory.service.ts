import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserInventory } from '../models';

interface Envelope<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  getInventory(): Observable<UserInventory[]> {
    return this.http
      .get<Envelope<{ items: UserInventory[] }>>(this.apiUrl)
      .pipe(map((res) => res.data.items));
  }
}
