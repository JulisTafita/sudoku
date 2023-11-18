import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuValidatorComponent } from './sudoku-validator.component';

const routes: Routes = [
    {
        path: '',
        component: SudokuValidatorComponent,
    
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudokuValidatorRoutingModule { }