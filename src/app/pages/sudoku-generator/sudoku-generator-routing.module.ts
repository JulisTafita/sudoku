import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuGeneratorComponent } from './sudoku-generator.component';

const routes: Routes = [
    {
        path: '',
        component: SudokuGeneratorComponent,
    
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudokuGeneratorRoutingModule { }