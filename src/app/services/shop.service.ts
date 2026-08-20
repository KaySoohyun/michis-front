import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShopCatalogResponse, BuyRequest, BuyResponse, ItemType, Rarity } from '../models';

@Injectable()
export class ShopService {
  private readonly apiUrl = `${environment.apiUrl}/v1/shop`;

  constructor(private http: HttpClient) {}

  getCatalog(type?: ItemType, rarity?: Rarity): Observable<ShopCatalogResponse> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (rarity) params = params.set('rarity', rarity);
    return this.http.get<ShopCatalogResponse>(`${this.apiUrl}/items`, { params });
  }

  buyItem(data: BuyRequest): Observable<BuyResponse> {
    return this.http.post<BuyResponse>(`${this.apiUrl}/buy`, data);
  }
}
