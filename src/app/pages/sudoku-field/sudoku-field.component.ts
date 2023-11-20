import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, NgZone, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { SudokuBoardReq } from 'src/app/@core/entities/sudoku-board-req';
import { SourceEnum } from 'src/app/@core/enumerations/source-enum';
import { SudokuTypeEnum } from 'src/app/@core/enumerations/sudoku-type.enum';
import { DataService } from 'src/app/@core/services/data.service';
import { SudokuService } from 'src/app/@core/services/sudoku.service';

@Component({
  selector: 'app-sudoku-field',
  templateUrl: './sudoku-field.component.html',
  styleUrls: ['./sudoku-field.component.scss']
})
export class SudokuFieldComponent {;
  sudokuBoardReq:SudokuBoardReq = new SudokuBoardReq();
  board : number[][] = [];
  disabledinputs: any[] = [];
  
  /*
    Listen for the data sent by parent component, the change the value of board variable by the one sent by parent.
  */
  type: SudokuTypeEnum = SudokuTypeEnum.EMPTY;
  constructor(private dataService: DataService, private sudokuService: SudokuService, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    this.dataService.data$.subscribe(data => {
      if( data.source ==SourceEnum.BUTTON){
        this.board = data.data;
        this.type = data.type;
        this.disabledinputs = [];
       if(data.type == SudokuTypeEnum.SOLVE){
        data.data.forEach((el: any, elIndx: any) => {
          el.forEach((subEl: any, subElIndex: any) => {
            if(data.data[elIndx][subElIndex] != 0){
              this.disabledinputs.push({elIndx: elIndx, subElIndx: subElIndex})
            }
          });
        });
       }
      }
    });
  }

  /*
    Set the value of the board by default in the begining, since we want empty grids.
  */
  ngOnInit(){
    this.board = this.sudokuService.Generate(SudokuTypeEnum.EMPTY);
  }


  getInputs(){
 // Assuming you have input elements with IDs 'input1', 'input2', etc.
  const elements = this.document.getElementsByTagName('input');
  for (let i = 0; i < elements.length; i++) {
    const inputValue = (elements[i] as HTMLInputElement).value;
    console.log(`Input ${i + 1} value:`, inputValue);
  }
  }

/*
  We are not using NgModel here, So we have to capture the value of input from respoective grid with (input)="onModelChange()".
  Verify if the value is a number, the changing the board case that have respective value by the data from the input.
  Finally Send this data to the parent component to be ready for  validation. 
*/

  onModelChange(value: any, col: number, index: number) {
    var number: number = parseInt(value.target.value, 10);
    if (!isNaN(number)){
      this.board[col][index] = number;
    }
    if (isNaN(number) || number == 0 ){
      this.board[col][index] = 0;
    }

    this.sudokuBoardReq.data = this.board;
    this.sudokuBoardReq.source = SourceEnum.FIElD;
    this.dataService.sendData(this.sudokuBoardReq);
  }

  isInputDisabled(col: number, indx: number) {
    if(this.disabledinputs.some(obj => obj.elIndx === col && obj.subElIndx === indx)){
      return true;
    }
    return false;
  }
}
