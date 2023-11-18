import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuValidatorComponent } from './sudoku-validator.component';
import { SudokuValidatorRoutingModule } from './sudoku-validator-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SudokuFieldComponent } from '../sudoku-field/sudoku-field.component';
import { SudokuFieldModule } from '../sudoku-field/sudoku-field.module';



@NgModule({
  declarations: [
    SudokuValidatorComponent
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SudokuValidatorRoutingModule, 
    SudokuFieldModule
  ]
})
export class SudokuValidatorModule { }
