import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CatDetailComponent } from './cat-detail.component';
import { CatStore } from '../../../services/cat.store';
import { CatService } from '../../../services/cat.service';
import { InventoryService } from '../../../services/inventory.service';
import type { Cat } from '../../../models';

describe('CatDetailComponent', () => {
  const makeCat = (): Cat => ({
    id: 'c1',
    name: 'Luna',
    species: 'Felis Luna',
    slotNumber: 1,
    hunger: 80,
    energy: 60,
    happiness: 70,
    cleanliness: 90,
    isAlive: true,
    birthDate: new Date().toISOString(),
  } as Cat);

  let getCatMock: ReturnType<typeof vi.fn>;
  let getInventoryMock: ReturnType<typeof vi.fn>;
  let catsList: Cat[];
  let upsertCatMock: ReturnType<typeof vi.fn>;
  let selectCatMock: ReturnType<typeof vi.fn>;
  let selectedSignal: WritableSignal<Cat | null>;

  const create = (): ComponentFixture<CatDetailComponent> => {
    const f = TestBed.createComponent(CatDetailComponent);
    // Simula la ruta /dashboard/cat/c1 (withComponentInputBinding bindea :id).
    f.componentRef.setInput('id', 'c1');
    f.detectChanges();
    return f;
  };

  beforeEach(async () => {
    const cat = makeCat();
    getCatMock = vi.fn().mockReturnValue(of({ cat, status: null }));
    getInventoryMock = vi.fn().mockReturnValue(of([]));
    catsList = [];
    selectedSignal = signal<Cat | null>(null);
    upsertCatMock = vi.fn((c: Cat) => {
      const i = catsList.findIndex((x) => x.id === c.id);
      if (i >= 0) catsList[i] = c;
      else catsList.push(c);
    });
    selectCatMock = vi.fn((id: string) =>
      selectedSignal.set(catsList.find((c) => c.id === id) ?? null),
    );

    await TestBed.configureTestingModule({
      imports: [CatDetailComponent],
      providers: [
        {
          provide: CatStore,
          useValue: {
            cats: signal(catsList).asReadonly(),
            selectedCat: selectedSignal.asReadonly(),
            catStatus: signal(null).asReadonly(),
            selectCat: selectCatMock,
            upsertCat: upsertCatMock,
          },
        },
        { provide: CatService, useValue: { getCat: getCatMock } },
        { provide: InventoryService, useValue: { getInventory: getInventoryMock } },
      ],
    }).compileComponents();
  });

  it('llama a GET /cats/:id con el id de la ruta y muestra el michi', () => {
    const f = create();

    expect(getCatMock).toHaveBeenCalledWith('c1');
    expect(upsertCatMock).toHaveBeenCalledWith(expect.objectContaining({ id: 'c1' }));
    expect(selectCatMock).toHaveBeenCalledWith('c1');
    expect((f.nativeElement as HTMLElement).textContent).toContain('Luna');
    expect((f.nativeElement as HTMLElement).textContent).not.toContain('Cargando michi');
  });

  it('muestra un error si el backend falla en lugar de "Cargando" infinito', () => {
    getCatMock.mockReturnValue(throwError(() => new Error('boom')));
    const f = create();

    const text = (f.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('No se pudo cargar el michi');
    expect(text).not.toContain('Cargando michi');
  });
});
