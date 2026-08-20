import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/v1`;
  private readonly coinsSignal = signal(0);

  readonly coins = this.coinsSignal.asReadonly();

  constructor(private http: HttpClient) {}

  loadCoins(): void {
    this.http.get<{ coinBalance: number }>(`${this.apiUrl}/users/me`).subscribe({
      next: (res) => this.coinsSignal.set(res.coinBalance),
      error: () => this.coinsSignal.set(0),
    });
  }

  updateCoins(amount: number): void {
    this.coinsSignal.set(amount);
  }
}
