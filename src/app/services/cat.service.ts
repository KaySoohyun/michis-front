import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Cat,
  CreateCatRequest,
  CatActionResponse,
  FeedResponse,
  PlayResponse,
  CleanResponse,
  SleepResponse,
} from '../models';

@Injectable()
export class CatService {
  private readonly apiUrl = `${environment.apiUrl}/v1/cats`;

  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl);
  }

  getCat(id: string): Observable<{ cat: Cat; status: { isHungry: boolean; isTired: boolean; isSad: boolean; isDirty: boolean } }> {
    return this.http.get<{ cat: Cat; status: { isHungry: boolean; isTired: boolean; isSad: boolean; isDirty: boolean } }>(
      `${this.apiUrl}/${id}`,
    );
  }

  adoptCat(data: CreateCatRequest): Observable<CatActionResponse> {
    return this.http.post<CatActionResponse>(this.apiUrl, data);
  }

  feedCat(id: string, inventoryItemId: string): Observable<FeedResponse> {
    return this.http.post<FeedResponse>(`${this.apiUrl}/${id}/feed`, { inventoryItemId });
  }

  playWithCat(id: string): Observable<PlayResponse> {
    return this.http.post<PlayResponse>(`${this.apiUrl}/${id}/play`, {});
  }

  cleanCat(id: string): Observable<CleanResponse> {
    return this.http.post<CleanResponse>(`${this.apiUrl}/${id}/clean`, {});
  }

  sleepCat(id: string, durationMinutes: number): Observable<SleepResponse> {
    return this.http.post<SleepResponse>(`${this.apiUrl}/${id}/sleep`, { durationMinutes });
  }

  releaseCat(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
