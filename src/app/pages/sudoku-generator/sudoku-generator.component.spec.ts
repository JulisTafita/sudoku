import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuGeneratorComponent } from './sudoku-generator.component';

describe('SudokuGeneratorComponent', () => {
  let component: SudokuGeneratorComponent;
  let fixture: ComponentFixture<SudokuGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
