import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  BuyRequest,
  BuyResponse,
  InventoryItem,
  ItemType,
  Rarity,
} from '../models';

interface Envelope<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ShopService {
  private readonly apiUrl = `${environment.apiUrl}/shop`;

  constructor(private http: HttpClient) {}

  getCatalog(
    type?: ItemType,
    rarity?: Rarity,
  ): Observable<{ items: InventoryItem[]; userCoins: number }> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (rarity) params = params.set('rarity', rarity);
    return this.http
      .get<Envelope<{ items: InventoryItem[]; userCoins: number }>>(
        `${this.apiUrl}/items`,
        { params },
      )
      .pipe(map((res) => res.data));
  }

  buyItem(data: BuyRequest): Observable<BuyResponse> {
    return this.http
      .post<Envelope<BuyResponse>>(`${this.apiUrl}/buy`, data)
      .pipe(map((res) => res.data));
  }
}
