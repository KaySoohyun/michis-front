import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CatConsoleComponent } from './cat-console.component';
import { CatStore } from '../../../services/cat.store';
import { InventoryService } from '../../../services/inventory.service';
import type { Cat } from '../../../models';

describe('CatConsoleComponent', () => {
  const makeCat = (): Cat =>
    ({
      id: 'c1',
      name: 'Luna',
      species: 'Felis Luna',
      slotNumber: 1,
      personality: 'Curiosa',
      lore: null,
      hunger: 80,
      energy: 60,
      happiness: 70,
      cleanliness: 90,
      avatarUrl: null,
      birthDate: new Date().toISOString(),
      isAlive: true,
      equippedItems: [],
      lastFedAt: null,
      lastPlayedAt: null,
    }) as Cat;

  let playMock: ReturnType<typeof vi.fn>;
  let cleanMock: ReturnType<typeof vi.fn>;
  let sleepMock: ReturnType<typeof vi.fn>;
  let feedMock: ReturnType<typeof vi.fn>;
  let getInventoryMock: ReturnType<typeof vi.fn>;

  const buttons = (f: ComponentFixture<CatConsoleComponent>): HTMLButtonElement[] =>
    Array.from(f.nativeElement.querySelectorAll('[role="toolbar"] button')) as HTMLButtonElement[];

  beforeEach(async () => {
    playMock = vi.fn();
    cleanMock = vi.fn();
    sleepMock = vi.fn();
    feedMock = vi.fn();
    getInventoryMock = vi.fn().mockReturnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CatConsoleComponent],
      providers: [
        {
          provide: CatStore,
          useValue: {
            catStatus: signal(null).asReadonly(),
            playWithCat: playMock,
            cleanCat: cleanMock,
            sleepCat: sleepMock,
            feedCat: feedMock,
          },
        },
        { provide: InventoryService, useValue: { getInventory: getInventoryMock } },
      ],
    }).compileComponents();
  });

  it('muestra nombre, status y foto si tiene', () => {
    const f = TestBed.createComponent(CatConsoleComponent);
    f.componentRef.setInput('cat', { ...makeCat(), avatarUrl: 'img-cat/michi2.png' });
    f.detectChanges();

    const text = (f.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Luna');
    expect(text).toContain('STATUS');
    const img = f.nativeElement.querySelector('img[alt="Luna"]');
    expect(img?.getAttribute('src')).toBe('img-cat/michi2.png');
  });

  it('JUGAR llama al store y COMER usa el primer alimento del inventario', () => {
    const f = TestBed.createComponent(CatConsoleComponent);
    f.componentRef.setInput('cat', makeCat());
    f.detectChanges();

    getInventoryMock.mockReturnValue(
      of([
        { id: 'i2', itemId: 'food-2', quantity: 3, item: { type: 'FOOD', name: 'Atún' } },
        { id: 'i1', itemId: 'clothes-1', quantity: 1, item: { type: 'CLOTHING', name: 'Gorra' } },
      ]),
    );

    buttons(f)[2].click(); // JUGAR
    buttons(f)[1].click(); // COMER

    expect(playMock).toHaveBeenCalledWith('c1');
    expect(feedMock).toHaveBeenCalledWith('c1', 'food-2');
  });

  it('COMER sin comida muestra aviso en lugar de llamar al store', () => {
    const f = TestBed.createComponent(CatConsoleComponent);
    f.componentRef.setInput('cat', makeCat());
    f.detectChanges();

    buttons(f)[1].click();
    f.detectChanges();

    expect(feedMock).not.toHaveBeenCalled();
    expect((f.nativeElement as HTMLElement).textContent).toContain('No tenés comida');
  });
});
