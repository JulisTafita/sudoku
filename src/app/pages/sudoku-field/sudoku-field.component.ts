import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from 'src/app/@core/services/data.service';

@Component({
  selector: 'app-sudoku-field',
  templateUrl: './sudoku-field.component.html',
  styleUrls: ['./sudoku-field.component.scss']
})
export class SudokuFieldComponent {
  board = [
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
  
  
  
  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe(data => {
    this.board = data
    });
  }
  inputData($event: any, id: number, caseNumber: number){
    var number: number = parseInt($event.data, 10);
    if ($event.data && typeof  number === "number"){
      this.board[caseNumber][id] =  number;
      this.dataService.sendData(this.board);
     console.log(this.board)
    }
  }
}
