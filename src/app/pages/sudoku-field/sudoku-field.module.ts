import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuFieldComponent } from './sudoku-field.component';
import { SanitizeHtmlPipe } from 'src/app/@core/pipes/html-sanitizer';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SudokuFieldComponent,  SanitizeHtmlPipe],
  exports: [SudokuFieldComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SudokuFieldModule { }
