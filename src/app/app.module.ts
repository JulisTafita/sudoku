import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { DataService } from './@core/services/data.service';
import { SudokuService } from './@core/services/sudoku.service';
import { LocalSudokuService } from './services/local-sudoku.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [DataService, {provide: SudokuService, useClass: LocalSudokuService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
