import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly userSignal = signal<User | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.handleAuthResponse(response.data);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.loadingSignal.set(false);
        this.errorSignal.set(error.error?.message || 'Error al iniciar sesión');
        return throwError(() => error);
      }),
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        this.handleAuthResponse(response.data);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.loadingSignal.set(false);
        this.errorSignal.set(error.error?.message || 'Error al registrar');
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.userSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private handleAuthResponse(response: {
    user: User;
    token: string;
    refreshToken: string;
  }): void {
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.userSignal.set(response.user);
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('access_token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.userSignal.set(user);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }
  }
}
