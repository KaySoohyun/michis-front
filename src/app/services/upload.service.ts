import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UploadResponse {
  publicUrl: string;
  secureUrl: string;
  thumbnailUrl: string;
  originalName: string;
  size: number;
}

@Injectable()
export class UploadService {
  private readonly apiUrl = `${environment.apiUrl}/v1/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(this.apiUrl, formData);
  }
}
