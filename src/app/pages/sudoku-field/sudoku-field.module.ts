import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuFieldComponent } from './sudoku-field.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SudokuFieldComponent],
  exports: [SudokuFieldComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SudokuFieldModule { }
