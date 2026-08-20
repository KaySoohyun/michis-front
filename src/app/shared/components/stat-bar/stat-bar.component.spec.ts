import { TestBed } from '@angular/core/testing';
import { StatBarComponent } from './stat-bar.component';

describe('StatBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatBarComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StatBarComponent);
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('value', 50);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
