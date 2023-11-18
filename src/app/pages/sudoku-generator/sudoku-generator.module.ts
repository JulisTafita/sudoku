import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuGeneratorComponent } from './sudoku-generator.component';
import { SudokuGeneratorRoutingModule } from './sudoku-generator-routing.module';



@NgModule({
  declarations: [
    SudokuGeneratorComponent
  ],
  imports: [
    CommonModule,
    SudokuGeneratorRoutingModule
  ]
})
export class SudokuGeneratorModule { }
