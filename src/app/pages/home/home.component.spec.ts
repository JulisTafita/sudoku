import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from 'src/app/@core/services/data.service';
import { SudokuService } from 'src/app/@core/services/sudoku.service';
import { LocalSudokuService } from 'src/app/services/local-sudoku.service';
import { SudokuFieldModule } from './sudoku-field/sudoku-field.module';
import { SourceEnum } from 'src/app/@core/enumerations/source-enum';
import { of } from 'rxjs';
import { SudokuTypeEnum } from 'src/app/@core/enumerations/sudoku-type.enum';
import { SudokuBoardReq } from 'src/app/@core/entities/sudoku-board-req';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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
  ];
  let sudokuServiceSpy: jasmine.SpyObj<SudokuService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [SudokuFieldModule],
      providers: [
        DataService,
        { provide: SudokuService, useClass: LocalSudokuService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
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

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should set board when receiving data from DataService with source FIELD', () => {
    const testData = {
      source: SourceEnum.FIELD,
      data: invalidBoard,
    };
    dataServiceSpy.data$ = of(testData);
    component.ngOnInit(); // Initialize the board

    expect(component.board).toEqual(testData.data);
  });

  it('should set result message to "Your suduko is not valid !" on sudoku invalid', () => {
    const testData = {
      source: SourceEnum.FIELD,
      data: invalidBoard,
    };
    component.board = invalidBoard;
    dataServiceSpy.data$ = of(testData);
    component.onValidate();
  
    expect(component.resultMessage).toEqual('Your suduko is not valid !');
  });

  it('should set result message to "Your suduko is valid !" on sudoku valid', () => {
    const testData = {
      source: SourceEnum.FIELD,
      data: validBoard,
    };
   
    component.board = validBoard;
    dataServiceSpy.data$ = of(testData);
    component.onValidate();

    expect(component.resultMessage).toEqual('Your suduko is valid !');
  });

  it('should generate a board to solve  and update dataService on onGenerate', () => {
    spyOn(dataServiceSpy, 'sendData'); 
    component.onGenerate();
    const generatedBoard = component.board;

    expect(generatedBoard.length).toEqual(9);
    let isValid: boolean = false;
    generatedBoard.forEach(element => {
      if(element.includes(0)){
        isValid = true;
      }
      expect(element.length).toEqual(9);
    });
    expect(isValid).toEqual(true);
    expect(dataServiceSpy.sendData).toHaveBeenCalled();
  });
  it('should generate a filled board and update dataService on fillSudokuGrid', () => {
    spyOn(dataServiceSpy, 'sendData'); 
    component.fillSudokuGrid();
    const generatedBoard = component.board;
    expect(generatedBoard.length).toEqual(9);
    let isValid: boolean = false;
    generatedBoard.forEach(element => {
      if(element.includes(0)){
        isValid = true;
      }
      expect(element.length).toEqual(9);
    });
    expect(isValid).toEqual(false);
    expect(dataServiceSpy.sendData).toHaveBeenCalled();
  });

  it('should generate a board to solve  and update dataService on onGenerate', () => {
    spyOn(dataServiceSpy, 'sendData'); 
    component.onGenerate();
    const generatedBoard = component.board;

    expect(generatedBoard.length).toEqual(9);
    let isValid: boolean = false;
    generatedBoard.forEach(element => {
      if(element.includes(0)){
        isValid = true;
      }
      expect(element.length).toEqual(9);
    });
    expect(isValid).toEqual(true);
    expect(dataServiceSpy.sendData).toHaveBeenCalled();
  });
  it('should Empty board and update dataService on emptySudokuGrid', () => {
    spyOn(dataServiceSpy, 'sendData'); 
    component.emptySudokuGrid();
    const generatedBoard = component.board;
    expect(generatedBoard).toEqual(invalidBoard);
    expect(dataServiceSpy.sendData).toHaveBeenCalled();
  });
});
