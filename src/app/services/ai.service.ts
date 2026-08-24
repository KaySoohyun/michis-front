import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  TriviaQuestion,
  AnswerTriviaRequest,
  AnswerTriviaResponse,
} from '../models';

interface Envelope<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly apiUrl = `${environment.apiUrl}/ai`;

  readonly currentTrivia = signal<TriviaQuestion | null>(null);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  generateTrivia(
    difficulty?: string,
    category?: string,
  ): Observable<TriviaQuestion> {
    this.loading.set(true);
    let params = new HttpParams();
    if (difficulty) params = params.set('difficulty', difficulty);
    if (category) params = params.set('category', category);

    return this.http
      .get<Envelope<TriviaQuestion>>(`${this.apiUrl}/generate-trivia`, { params })
      .pipe(
        map((res) => res.data),
        tap({
          next: (trivia) => {
            this.currentTrivia.set(trivia);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        }),
      );
  }

  answerTrivia(
    request: AnswerTriviaRequest,
  ): Observable<AnswerTriviaResponse> {
    return this.http
      .post<Envelope<AnswerTriviaResponse>>(
        `${this.apiUrl}/trivia/answer`,
        request,
      )
      .pipe(map((res) => res.data));
  }

  clearTrivia(): void {
    this.currentTrivia.set(null);
  }
}
