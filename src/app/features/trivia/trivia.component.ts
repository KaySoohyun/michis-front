import { Component, inject, signal, OnInit } from '@angular/core';
import { AiService } from '../../services/ai.service';
import { UserService } from '../../services/user.service';

interface TriviaResult {
  correct: boolean;
  correctAnswer: string;
  explanation: string | null;
  coinsEarned: number;
}

type TriviaDifficulty = 'easy' | 'medium' | 'hard' | 'cosmic';

interface DifficultyOption {
  value: TriviaDifficulty;
  label: string;
  coins: string;
  icon: string;
}

const DIFFICULTIES: DifficultyOption[] = [
  { value: 'easy', label: 'EASY', coins: '5-10', icon: '◆' },
  { value: 'medium', label: 'MEDIUM', coins: '15-25', icon: '◆◆' },
  { value: 'hard', label: 'HARD', coins: '30-50', icon: '◆◆◆' },
  { value: 'cosmic', label: 'COSMIC', coins: '75-100', icon: '★' },
];

@Component({
  selector: 'app-trivia',
  template: `
    <div class="mx-auto max-w-2xl px-4 py-8 font-body sm:px-6">
      <header class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 class="font-display text-2xl tracking-[0.2em] text-white">TRIVIA CÓSMICA</h1>
        <p class="font-display text-lg text-accent">
          <span aria-hidden="true">🪙</span>
          <span class="sr-only">Monedas:</span> {{ userService.coins() }}
        </p>
      </header>

      @if (selectedDifficulty() === null) {
        <div class="pixel-frame bg-[hsl(230_25%_10%)] p-6">
          <h2 class="mb-2 font-display text-xl tracking-widest text-white">ELEGÍ TU NIVEL</h2>
          <p class="mb-6 text-sm text-white/60">
            Todas las preguntas serán de la dificultad elegida.
          </p>
          <div class="grid gap-3 sm:grid-cols-2">
            @for (d of difficulties; track d.value) {
              <button
                type="button"
                (click)="chooseDifficulty(d.value)"
                [attr.aria-label]="'Dificultad ' + d.label + ', recompensa entre ' + d.coins + ' monedas'"
                class="pixel-btn flex min-h-[44px] flex-col items-center gap-1 border-2 border-white/70 bg-[hsl(230_20%_14%)] px-4 py-3 transition-colors hover:border-accent hover:bg-[hsl(262_83%_35%_/_0.4)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span class="font-display text-lg tracking-[0.2em] text-white">
                  {{ d.icon }} {{ d.label }}
                </span>
                <span class="font-display text-sm text-accent">🪙 {{ d.coins }}</span>
              </button>
            }
          </div>
        </div>
      } @else {
        <div class="pixel-frame bg-[hsl(230_25%_10%)] p-6">
          <div class="mb-4 flex items-center justify-between gap-3">
            <span
              class="bg-[hsl(199_89%_38%)] px-2 py-0.5 font-display text-xs tracking-wider text-white"
              aria-label="Dificultad seleccionada"
            >
              {{ selectedDifficulty() }}
            </span>
            <button
              type="button"
              (click)="backToSelector()"
              aria-label="Volver al selector de dificultad"
              class="pixel-btn flex h-9 w-9 items-center justify-center border-2 border-white/70 bg-[hsl(0_84%_45%)] font-display text-lg leading-none text-white hover:bg-[hsl(0_84%_55%)] focus-visible:outline-2 focus-visible:outline-accent"
            >
              ✕
            </button>
          </div>

          @if (showResult()) {
            <div class="text-center">
              @if (lastResult()?.correct) {
                <div class="mb-4 text-4xl" aria-hidden="true">🎉</div>
                <h2 class="mb-2 font-display text-xl tracking-wider text-success">¡CORRECTO!</h2>
                <p class="text-white/80">Ganaste {{ lastResult()?.coinsEarned }} monedas</p>
              } @else {
                <div class="mb-4 text-4xl" aria-hidden="true">😿</div>
                <h2 class="mb-2 font-display text-xl tracking-wider text-danger">INCORRECTO</h2>
                <p class="text-white/80">
                  La respuesta correcta era: {{ lastResult()?.correctAnswer }}
                </p>
              }
              <p class="mt-4 text-sm text-white/60">{{ lastResult()?.explanation }}</p>
              <button
                type="button"
                (click)="loadNewTrivia()"
                class="pixel-btn border-2 border-white/70 bg-[hsl(262_83%_58%)] px-5 py-1.5 font-display text-sm tracking-wider text-white hover:bg-[hsl(262_83%_65%)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                SIGUIENTE
              </button>
            </div>
          } @else if (aiService.loading()) {
            <p class="py-12 text-center text-white/60">Buscando pregunta...</p>
          } @else if (trivia(); as q) {
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <span class="bg-[hsl(262_83%_45%)] px-2 py-0.5 font-display text-xs tracking-wider text-white">
                {{ q.category }}
              </span>
              <span class="ml-auto font-display text-sm text-accent">🪙 {{ q.rewardCoins }}</span>
            </div>

            <h2 class="mb-6 font-display text-lg leading-snug text-white">{{ q.question }}</h2>

            <div class="space-y-3">
              @for (option of q.options; track $index) {
                <button
                  type="button"
                  (click)="onAnswer($index)"
                  [disabled]="answered()"
                  class="pixel-btn w-full border-2 border-white/70 bg-[hsl(230_20%_14%)] p-3 text-left text-sm text-white transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-accent"
                  [class]="getOptionClass($index)"
                >
                  <span class="font-display">{{ $index + 1 }}.</span> {{ option }}
                </button>
              }
            </div>
          } @else {
            <div class="py-12 text-center">
              <p class="mb-4 text-white/60">No hay preguntas disponibles</p>
              <button
                type="button"
                (click)="loadNewTrivia()"
                class="pixel-btn border-2 border-white/70 bg-[hsl(262_83%_58%)] px-5 py-1.5 font-display text-sm tracking-wider text-white hover:bg-[hsl(262_83%_65%)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                GENERAR PREGUNTA
              </button>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export default class TriviaComponent implements OnInit {
  readonly aiService = inject(AiService);
  readonly userService = inject(UserService);

  readonly difficulties = DIFFICULTIES;
  readonly selectedDifficulty = signal<TriviaDifficulty | null>(null);

  readonly trivia = this.aiService.currentTrivia;
  readonly answered = signal(false);
  readonly selectedAnswer = signal<number | null>(null);
  readonly showResult = signal(false);
  readonly lastResult = signal<TriviaResult | null>(null);

  ngOnInit(): void {
    this.backToSelector();
  }

  chooseDifficulty(difficulty: TriviaDifficulty): void {
    this.selectedDifficulty.set(difficulty);
    this.loadNewTrivia();
  }

  backToSelector(): void {
    this.selectedDifficulty.set(null);
    this.resetQuestionState();
    this.aiService.clearTrivia();
  }

  loadNewTrivia(): void {
    this.resetQuestionState();
    this.aiService.generateTrivia(this.selectedDifficulty() ?? undefined).subscribe();
  }

  onAnswer(index: number): void {
    if (this.answered()) return;

    this.answered.set(true);
    this.selectedAnswer.set(index);

    const trivia = this.trivia();
    if (!trivia) return;

    this.aiService
      .answerTrivia({ triviaId: trivia.triviaId, answer: trivia.options[index] })
      .subscribe({
        next: (res) => {
          this.lastResult.set({
            correct: res.wasCorrect,
            correctAnswer: res.correctAnswer,
            explanation: res.explanation,
            coinsEarned: res.rewardEarned,
          });
          this.showResult.set(true);
          if (res.wasCorrect) {
            this.userService.loadCoins();
          }
        },
      });
  }

  getOptionClass(index: number): string {
    if (!this.answered()) {
      return 'hover:bg-[hsl(262_83%_35%_/_0.4)]';
    }

    const trivia = this.trivia();
    if (!trivia) return '';

    const correct = this.lastResult()?.correctAnswer;
    if (index === this.selectedAnswer() && correct !== undefined) {
      const isCorrect = trivia.options[index] === correct;
      return isCorrect
        ? 'border-success bg-[hsl(142_71%_35%_/_0.4)]'
        : 'border-danger bg-[hsl(0_84%_60%_/_0.4)]';
    }
    if (correct !== undefined && trivia.options[index] === correct) {
      return 'border-success bg-[hsl(142_71%_35%_/_0.4)]';
    }
    return 'opacity-50';
  }

  private resetQuestionState(): void {
    this.answered.set(false);
    this.selectedAnswer.set(null);
    this.showResult.set(false);
    this.lastResult.set(null);
  }
}
