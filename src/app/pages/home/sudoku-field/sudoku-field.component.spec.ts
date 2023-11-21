import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuFieldComponent } from './sudoku-field.component';
import { DataService } from 'src/app/@core/services/data.service';
import { LocalSudokuService } from 'src/app/services/local-sudoku.service';
import { SudokuService } from 'src/app/@core/services/sudoku.service';
import { SudokuTypeEnum } from 'src/app/@core/enumerations/sudoku-type.enum';
import { SourceEnum } from 'src/app/@core/enumerations/source-enum';
import { of } from 'rxjs';

describe('SudokuFieldComponent', () => {
  let component: SudokuFieldComponent;
  let fixture: ComponentFixture<SudokuFieldComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let sudokuServiceSpy: jasmine.SpyObj<SudokuService>;
  let invalidBoard: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let validBoard: number[][] = [
    [6, 5, 3, 4, 1, 7, 2, 9, 8],
    [4, 7, 9, 6, 2, 8, 5, 1, 3],
    [2, 1, 8, 5, 9, 3, 7, 6, 4],
    [1, 2, 6, 7, 8, 5, 3, 4, 9],
    [8, 9, 4, 1, 3, 2, 6, 5, 7],
    [7, 3, 5, 9, 6, 4, 8, 2, 1],
    [3, 6, 1, 2, 7, 9, 4, 8, 5],
    [9, 4, 7, 8, 5, 6, 1, 3, 2],
    [5, 8, 2, 3, 4, 1, 9, 7, 6],
  ]
  beforeEach(async () => {
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['data$', 'sendData']);
    const sudokuServiceSpyObj = jasmine.createSpyObj('SudokuService', ['Generate']);
    await TestBed.configureTestingModule({
      declarations: [ SudokuFieldComponent ], 
      providers: [DataService, {provide: SudokuService, useClass: LocalSudokuService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuFieldComponent);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    sudokuServiceSpy = TestBed.inject(
      SudokuService
    ) as jasmine.SpyObj<SudokuService>;
    component = fixture.componentInstance;
    
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize board and type in ngOnInit', () => {
    spyOn(sudokuServiceSpy, 'Generate').and.returnValue(invalidBoard);
    component.ngOnInit();

    expect(component.board).toEqual(invalidBoard);
    expect(component.type).toEqual(SudokuTypeEnum.EMPTY);
  });

  // it('should update board and type when receiving data from DataService with source BUTTON', () => {
  //   component.board = validBoard;
  //   const testData = {
  //     source: SourceEnum.BUTTON,
  //     data: validBoard,
  //     type: SudokuTypeEnum.SOLVE,
  //   };
  //   dataServiceSpy.data$ = of(testData);
    
  //   component.ngOnInit(); // Initialize the board
  //   console.log(component.board)
  //  // 

  //   expect(component.board).toEqual(testData.data);
  //   expect(component.type).toEqual(testData.type);
  // });
});
