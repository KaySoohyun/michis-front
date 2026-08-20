import { Component, inject, signal } from '@angular/core';
import { AiService } from '../../services/ai.service';
import { UserService } from '../../services/user.service';
import { TriviaQuestion } from '../../models';

@Component({
  selector: 'app-trivia',
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">🌟 Trivia Cósmica</h1>
        <div class="text-lg font-medium text-yellow-600">💰 {{ userService.coins() }}</div>
      </div>

      @if (showResult()) {
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="text-center">
            @if (lastResult()?.correct) {
              <div class="text-4xl mb-4">🎉</div>
              <h2 class="text-xl font-bold text-green-700 mb-2">¡Correcto!</h2>
              <p class="text-gray-600">Ganaste {{ lastResult()?.coinsEarned }} monedas</p>
            } @else {
              <div class="text-4xl mb-4">😿</div>
              <h2 class="text-xl font-bold text-red-700 mb-2">Incorrecto</h2>
              <p class="text-gray-600">La respuesta correcta era la opción {{ lastResult()?.correctAnswer! + 1 }}</p>
            }
            <p class="text-sm text-gray-500 mt-4">{{ lastResult()?.explanation }}</p>
            <button
              (click)="loadNewTrivia()"
              class="mt-6 py-2 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Siguiente pregunta
            </button>
          </div>
        </div>
      } @else if (aiService.loading()) {
        <div class="text-center py-12 text-gray-500">Generando pregunta...</div>
      } @else if (trivia(); as q) {
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">{{ q.category }}</span>
            <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{{ q.difficulty }}</span>
            <span class="text-xs text-gray-500 ml-auto">💰 {{ q.rewardCoins }} monedas</span>
          </div>

          <h2 class="text-lg font-semibold text-gray-900 mb-6">{{ q.question }}</h2>

          <div class="space-y-3">
            @for (option of q.options; track $index) {
              <button
                (click)="onAnswer($index)"
                [disabled]="answered()"
                class="w-full text-left p-4 border rounded-lg transition-colors"
                [class]="getOptionClass($index)"
              >
                <span class="font-medium">{{ $index + 1 }}.</span> {{ option }}
              </button>
            }
          </div>
        </div>
      } @else {
        <div class="text-center py-12">
          <p class="text-gray-500 mb-4">No hay preguntas disponibles</p>
          <button
            (click)="loadNewTrivia()"
            class="py-2 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Generar pregunta
          </button>
        </div>
      }
    </div>
  `,
})
export default class TriviaComponent {
  readonly aiService = inject(AiService);
  readonly userService = inject(UserService);

  readonly trivia = this.aiService.currentTrivia;
  readonly answered = signal(false);
  readonly selectedAnswer = signal<number | null>(null);
  readonly showResult = signal(false);
  readonly lastResult = signal<{ correct: boolean; correctAnswer: number; explanation: string; coinsEarned: number } | null>(null);

  ngOnInit(): void {
    if (!this.trivia()) {
      this.loadNewTrivia();
    }
  }

  loadNewTrivia(): void {
    this.answered.set(false);
    this.selectedAnswer.set(null);
    this.showResult.set(false);
    this.lastResult.set(null);
    this.aiService.generateTrivia().subscribe();
  }

  onAnswer(index: number): void {
    if (this.answered()) return;

    this.answered.set(true);
    this.selectedAnswer.set(index);

    const trivia = this.trivia();
    if (!trivia) return;

    this.aiService.answerTrivia({ triviaId: trivia.id, answer: index }).subscribe({
      next: (res) => {
        this.lastResult.set({
          correct: res.correct,
          correctAnswer: res.correctAnswer,
          explanation: res.explanation,
          coinsEarned: res.coinsEarned,
        });
        this.showResult.set(true);
        this.userService.updateCoins(res.totalCoins);
      },
    });
  }

  getOptionClass(index: number): string {
    if (!this.answered()) {
      return 'border-gray-200 hover:border-purple-300 hover:bg-purple-50';
    }

    const trivia = this.trivia();
    if (!trivia) return 'border-gray-200';

    if (index === trivia.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    if (index === this.selectedAnswer()) {
      return 'border-red-500 bg-red-50';
    }
    return 'border-gray-200 opacity-50';
  }
}
