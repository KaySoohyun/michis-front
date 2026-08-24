import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { AdoptarComponent } from './adoptar.component';
import { KittensService } from '../../../services/kittens.service';
import { CatStore } from '../../../services/cat.store';
import { KittenProfile } from '../../../models';

describe('AdoptarComponent', () => {
  const kitten = (id: string, name: string): KittenProfile => ({
    id,
    name,
    species: `Felis ${name}`,
    description: 'desc',
    personality: 'personalidad',
    lore: 'lore',
    imageName: `${id}.png`,
    imageUrl: null,
  });

  const kittens: KittenProfile[] = [kitten('k1', 'Nova'), kitten('k2', 'Quasar')];

  let loadKittensMock: ReturnType<typeof vi.fn>;
  let loadCatsMock: ReturnType<typeof vi.fn>;
  let adoptCatMock: ReturnType<typeof vi.fn>;
  let catsSignal: ReturnType<typeof signal<{ slotNumber: number }[]>>;
  let storeErrorSignal: ReturnType<typeof signal<string | null>>;

  beforeEach(async () => {
    loadKittensMock = vi.fn().mockReturnValue(of([]));
    loadCatsMock = vi.fn();
    adoptCatMock = vi.fn().mockReturnValue(of({ cat: { id: 'c1' } }));
    catsSignal = signal([]);
    storeErrorSignal = signal<string | null>(null);

    await TestBed.configureTestingModule({
      imports: [AdoptarComponent],
      providers: [
        {
          provide: KittensService,
          useValue: {
            kittens: signal(kittens).asReadonly(),
            loading: signal(false).asReadonly(),
            error: signal(null).asReadonly(),
            imageUrl: (k: KittenProfile) => `img-cat/${k.imageName}`,
            loadKittens: loadKittensMock,
          },
        },
        {
          provide: CatStore,
          useValue: {
            cats: catsSignal.asReadonly(),
            loading: signal(false).asReadonly(),
            error: storeErrorSignal.asReadonly(),
            loadCats: loadCatsMock,
            adoptCat: adoptCatMock,
          },
        },
      ],
    }).compileComponents();
  });

  function create(): ComponentFixture<AdoptarComponent> {
    const f = TestBed.createComponent(AdoptarComponent);
    f.detectChanges();
    return f;
  }

  function adoptButtons(f: ComponentFixture<AdoptarComponent>): HTMLButtonElement[] {
    return Array.from(
      f.nativeElement.querySelectorAll('button[aria-label^="Adoptar a"]'),
    ) as HTMLButtonElement[];
  }

  it('no menciona el slot en el botón de adoptar', () => {
    const f = create();

    for (const button of adoptButtons(f)) {
      expect(button.textContent?.trim()).toBe('ADOPTAR');
    }
  });

  it('carga los michis si el store está vacío al entrar directo', () => {
    create();

    expect(loadCatsMock).toHaveBeenCalled();
  });

  it('adopta en el primer slot libre real según los michis cargados', () => {
    catsSignal.set([{ slotNumber: 1 }, { slotNumber: 2 }]);
    const f = create();

    const buttons = adoptButtons(f);
    (buttons[1] as HTMLButtonElement).click();

    expect(adoptCatMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Quasar', slotNumber: 3 }),
    );
  });

  it('muestra el error solo en la card del gatito que se intentó adoptar', () => {
    const f = create();

    adoptButtons(f)[0].click();
    storeErrorSignal.set('El slot ya está ocupado');
    f.detectChanges();

    const alerts = Array.from(
      f.nativeElement.querySelectorAll('[role="alert"]'),
    ) as HTMLElement[];
    expect(alerts).toHaveLength(1);
    expect(alerts[0].textContent).toContain('slot ya está ocupado');
  });

  it('muestra confirmación de éxito en lugar del aviso de slots llenos', () => {
    catsSignal.set([{ slotNumber: 1 }, { slotNumber: 2 }]);
    const f = create();

    adoptButtons(f)[0].click();
    f.detectChanges();

    const text = (f.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('ahora es parte de tu familia');
    expect(text).not.toContain('Tenés los 3 slots ocupados');
  });
});
