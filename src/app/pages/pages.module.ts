import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SudokuGeneratorModule } from './sudoku-generator/sudoku-generator.module';
import { SudokuValidatorModule } from './sudoku-validator/sudoku-validator.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SudokuValidatorModule,
    SudokuGeneratorModule,
    HomeModule
  ]
})
export class PagesModule { }
