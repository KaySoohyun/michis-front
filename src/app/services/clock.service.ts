import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClockService implements OnDestroy {
  private readonly nowSignal = signal<Date>(new Date());
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private subscribers = 0;

  /** Fecha/hora actual reactiva. Único lugar autorizado para `new Date()`. */
  readonly now = this.nowSignal.asReadonly();

  start(): void {
    this.subscribers++;
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.nowSignal.set(new Date()), 1000);
  }

  stop(): void {
    this.subscribers--;
    if (this.subscribers > 0 || !this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
