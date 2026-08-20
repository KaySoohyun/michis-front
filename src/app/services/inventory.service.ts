import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInventory, EquipRequest, EquipResponse } from '../models';

@Injectable()
export class InventoryService {
  private readonly apiUrl = `${environment.apiUrl}/v1/inventory`;

  constructor(private http: HttpClient) {}

  getInventory(): Observable<UserInventory[]> {
    return this.http.get<UserInventory[]>(this.apiUrl);
  }

  equipItem(data: EquipRequest): Observable<EquipResponse> {
    return this.http.post<EquipResponse>(`${this.apiUrl}/equip`, data);
  }
}
