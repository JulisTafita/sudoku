import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SudokuFieldModule } from './sudoku-field/sudoku-field.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    SudokuFieldModule
  ]
})
export class HomeModule { }
