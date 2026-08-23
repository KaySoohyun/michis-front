import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  Cat,
  CatStatus,
  CreateCatRequest,
  CatActionResponse,
  FeedResponse,
  PlayResponse,
  CleanResponse,
  SleepResponse,
  EquipResponse,
} from '../models';

interface Envelope<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class CatService {
  private readonly apiUrl = `${environment.apiUrl}/cats`;

  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http
      .get<Envelope<Cat[]>>(this.apiUrl)
      .pipe(map((res) => res.data));
  }

  getCat(id: string): Observable<{ cat: Cat; status: CatStatus }> {
    return this.http
      .get<Envelope<Cat>>(`${this.apiUrl}/${id}`)
      .pipe(map((res) => ({ cat: res.data, status: res.data.status ?? this.emptyStatus() })));
  }

  adoptCat(data: CreateCatRequest): Observable<CatActionResponse> {
    return this.http
      .post<Envelope<{ cat: Cat }>>(this.apiUrl, data)
      .pipe(map((res) => ({ cat: res.data.cat })));
  }

  feedCat(id: string, inventoryItemId: string): Observable<FeedResponse> {
    return this.http
      .post<Envelope<FeedResponse>>(`${this.apiUrl}/${id}/feed`, { inventoryItemId })
      .pipe(map((res) => res.data));
  }

  playWithCat(id: string): Observable<PlayResponse> {
    return this.http
      .post<Envelope<PlayResponse>>(`${this.apiUrl}/${id}/play`, {})
      .pipe(map((res) => res.data));
  }

  cleanCat(id: string): Observable<CleanResponse> {
    return this.http
      .post<Envelope<CleanResponse>>(`${this.apiUrl}/${id}/clean`, {})
      .pipe(map((res) => res.data));
  }

  sleepCat(id: string, durationMinutes: number): Observable<SleepResponse> {
    return this.http
      .post<Envelope<SleepResponse>>(`${this.apiUrl}/${id}/sleep`, { durationMinutes })
      .pipe(map((res) => res.data));
  }

  equipCat(id: string, inventoryItemId: string): Observable<EquipResponse> {
    return this.http
      .post<Envelope<EquipResponse>>(`${this.apiUrl}/${id}/equip`, { inventoryItemId })
      .pipe(map((res) => res.data));
  }

  unequipCat(id: string, itemId: string): Observable<EquipResponse> {
    return this.http
      .delete<Envelope<EquipResponse>>(`${this.apiUrl}/${id}/equip/${itemId}`)
      .pipe(map((res) => res.data));
  }

  releaseCat(id: string): Observable<{ message: string }> {
    return this.http
      .delete<Envelope<{ message: string }>>(`${this.apiUrl}/${id}`)
      .pipe(map((res) => res.data));
  }

  private emptyStatus(): CatStatus {
    return {
      isHungry: false,
      isTired: false,
      isSad: false,
      isDirty: false,
      isCritical: false,
    };
  }
}
