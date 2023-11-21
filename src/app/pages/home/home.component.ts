import { Component } from '@angular/core';
import { SudokuBoardReq } from 'src/app/@core/entities/sudoku-board-req';
import { SourceEnum } from 'src/app/@core/enumerations/source-enum';
import { SudokuTypeEnum } from 'src/app/@core/enumerations/sudoku-type.enum';
import { DataService } from 'src/app/@core/services/data.service';
import { SudokuService } from 'src/app/@core/services/sudoku.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  msgNotValid : string  = "Your suduko is not valid !"
  msgValid : string = "Your suduko is valid !"
  sudokuBoardReq:SudokuBoardReq = new SudokuBoardReq();
  resultMessage: string = ""
  board: number[][] = [];

  /*
    Listen the data from the parent component using injected service 'DataService'.
    Affecting the value of board by the value from the parent component, after checking it if the data is from the parent since both parent and child component use the same service

  */
  constructor(
    private dataService: DataService, 
    private sudokuService: SudokuService) {
    this.dataService.data$.subscribe(data=> {
      if( data.source == SourceEnum.FIELD){
        this.board = data.data
      }
      this.resultMessage = "";
    });
  }
  ngOnInit(){
    this.board = this.sudokuService.Generate(SudokuTypeEnum.EMPTY);
  }

  /*
    Check current board if it is valid or not.
  */
  onValidate(){
    let resp: boolean =  this.sudokuService.Check(this.board)
    this.resultMessage =  resp? this.msgValid: this.msgNotValid;
  }

  /*
    Generate board according to the type passed in the parameter.
    SudokuTypeEnum.SOLVE if we want to generate a board with missing value to solve by user.
  */
  onGenerate(){
    this.board = this.sudokuService.Generate(SudokuTypeEnum.SOLVE);
    this.sudokuBoardReq.data = this.board;
    this.sudokuBoardReq.source = SourceEnum.BUTTON;
    this.sudokuBoardReq.type = SudokuTypeEnum.SOLVE;
    this.dataService.sendData(this.sudokuBoardReq)
    
  }
  
  closeMessageResponseModal() {
    this.resultMessage = ""
  }
 
  /*
    Clear the board, changing its value by default. All cases have value of ZERO.
  */
  emptySudokuGrid(){
    this.sudokuBoardReq.data = this.sudokuService.Generate(SudokuTypeEnum.EMPTY);
    this.sudokuBoardReq.source = SourceEnum.BUTTON;
    this.sudokuBoardReq.type = SudokuTypeEnum.EMPTY;
    this.dataService.sendData(this.sudokuBoardReq);
  
  }

    /*
    Generate board according to the type passed in the parameter.
    SudokuTypeEnum.FILLED if we want to generate a full  value of the board.
  */
  fillSudokuGrid(){
    this.board = this.sudokuService.Generate(SudokuTypeEnum.FILLED)
    this.sudokuBoardReq.data = this.board;
    this.sudokuBoardReq.source = SourceEnum.BUTTON
    this.sudokuBoardReq.type = SudokuTypeEnum.FILLED;
    this.dataService.sendData(this.sudokuBoardReq);
  }
}
