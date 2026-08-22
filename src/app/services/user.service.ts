import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly coinsSignal = signal(0);

  readonly coins = this.coinsSignal.asReadonly();

  constructor(private http: HttpClient) {}

  loadCoins(): void {
    this.http
      .get<{ data: { coinBalance: number } }>(`${this.apiUrl}/me`)
      .subscribe({
        next: (res) => this.coinsSignal.set(res.data.coinBalance),
        error: () => this.coinsSignal.set(0),
      });
  }

  updateCoins(amount: number): void {
    this.coinsSignal.set(amount);
  }
}
