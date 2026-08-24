import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import TriviaComponent from './trivia.component';
import { AiService } from '../../services/ai.service';
import { UserService } from '../../services/user.service';
import { TriviaQuestion } from '../../models';

describe('TriviaComponent', () => {
  const question: TriviaQuestion = {
    triviaId: 't1',
    question: '¿Pregunta?',
    options: ['A', 'B', 'C', 'D'],
    difficulty: 'easy',
    category: 'astronomy',
    rewardCoins: 20,
  };

  let generateTriviaMock: ReturnType<typeof vi.fn>;
  let clearTriviaMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    const currentTrivia = signal<TriviaQuestion | null>(null);

    generateTriviaMock = vi.fn().mockImplementation(() => {
      currentTrivia.set(question);
      return of(question);
    });
    clearTriviaMock = vi.fn();

    await TestBed.configureTestingModule({
      imports: [TriviaComponent],
      providers: [
        {
          provide: AiService,
          useValue: {
            currentTrivia,
            loading: signal(false),
            generateTrivia: generateTriviaMock,
            answerTrivia: vi.fn(),
            clearTrivia: clearTriviaMock,
          },
        },
        {
          provide: UserService,
          useValue: {
            coins: signal(100).asReadonly(),
            loadCoins: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  function create(): ComponentFixture<TriviaComponent> {
    return TestBed.createComponent(TriviaComponent);
  }

  function buttonsOf(f: ComponentFixture<TriviaComponent>): HTMLButtonElement[] {
    return Array.from(
      f.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[];
  }

  function buttonWithText(
    f: ComponentFixture<TriviaComponent>,
    text: string,
  ): HTMLButtonElement {
    const found = buttonsOf(f).find((b) => (b.textContent ?? '').includes(text));
    if (!found) throw new Error(`Botón "${text}" no encontrado`);
    return found;
  }

  it('muestra el selector con las 4 dificultades al entrar', () => {
    const f = create();
    f.detectChanges();

    const labels = buttonsOf(f).map((b) => b.textContent ?? '');
    expect(labels.some((t) => t.includes('EASY'))).toBe(true);
    expect(labels.some((t) => t.includes('MEDIUM'))).toBe(true);
    expect(labels.some((t) => t.includes('HARD'))).toBe(true);
    expect(labels.some((t) => t.includes('COSMIC'))).toBe(true);
    expect(generateTriviaMock).not.toHaveBeenCalled();
  });

  it('al elegir dificultad pide preguntas de ese nivel', () => {
    const f = create();
    f.detectChanges();

    buttonWithText(f, 'EASY').click();
    f.detectChanges();

    expect(generateTriviaMock).toHaveBeenCalledWith('easy');
    expect(f.componentInstance.selectedDifficulty()).toBe('easy');
  });

  it('la X vuelve al selector y limpia la pregunta', () => {
    const f = create();
    f.detectChanges();

    buttonWithText(f, 'EASY').click();
    f.detectChanges();

    const backButton = buttonsOf(f).find(
      (b) => b.getAttribute('aria-label') === 'Volver al selector de dificultad',
    );
    expect(backButton).toBeTruthy();
    backButton!.click();
    f.detectChanges();

    expect(clearTriviaMock).toHaveBeenCalled();
    expect(f.componentInstance.selectedDifficulty()).toBeNull();
    expect(buttonsOf(f).some((b) => (b.textContent ?? '').includes('COSMIC'))).toBe(
      true,
    );
  });

  it('SIGUIENTE pide otra pregunta de la misma dificultad tras fallar', () => {
    const f = create();
    f.detectChanges();

    const aiService = TestBed.inject(AiService);
    vi.mocked(aiService.answerTrivia).mockReturnValue(
      of({
        wasCorrect: false,
        correctAnswer: 'B',
        explanation: 'Porque',
        rewardEarned: 0,
      }),
    );

    buttonWithText(f, 'HARD').click();
    f.detectChanges();

    buttonsOf(f).find((b) => (b.textContent ?? '').includes('1.'))!.click();
    f.detectChanges();

    generateTriviaMock.mockClear();
    buttonWithText(f, 'SIGUIENTE').click();

    expect(generateTriviaMock).toHaveBeenCalledWith('hard');
  });
});
