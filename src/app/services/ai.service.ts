import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  GeneratedCat,
  GenerateCatRequest,
  TriviaQuestion,
  AnswerTriviaRequest,
  AnswerTriviaResponse,
  TriviaHistoryEntry,
} from '../models';

@Injectable()
export class AiService {
  private readonly apiUrl = `${environment.apiUrl}/v1/ai`;

  readonly lastGeneratedCat = signal<GeneratedCat | null>(null);
  readonly currentTrivia = signal<TriviaQuestion | null>(null);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  generateCat(request: GenerateCatRequest): Observable<GeneratedCat> {
    this.loading.set(true);
    return this.http.post<GeneratedCat>(`${this.apiUrl}/generate-cat`, request).pipe(
      tap({
        next: (cat) => {
          this.lastGeneratedCat.set(cat);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      }),
    );
  }

  generateTrivia(difficulty?: string, category?: string): Observable<TriviaQuestion> {
    this.loading.set(true);
    let params = new HttpParams();
    if (difficulty) params = params.set('difficulty', difficulty);
    if (category) params = params.set('category', category);

    return this.http.get<TriviaQuestion>(`${this.apiUrl}/generate-trivia`, { params }).pipe(
      tap({
        next: (trivia) => {
          this.currentTrivia.set(trivia);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      }),
    );
  }

  answerTrivia(request: AnswerTriviaRequest): Observable<AnswerTriviaResponse> {
    return this.http.post<AnswerTriviaResponse>(`${this.apiUrl}/trivia/answer`, request);
  }

  getHistory(): Observable<TriviaHistoryEntry[]> {
    return this.http.get<TriviaHistoryEntry[]>(`${this.apiUrl}/trivia/history`);
  }

  clearGeneratedCat(): void {
    this.lastGeneratedCat.set(null);
  }

  clearTrivia(): void {
    this.currentTrivia.set(null);
  }
}
