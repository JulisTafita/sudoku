import { Injectable } from "@angular/core";
import { SudokuTypeEnum } from "../enumerations/sudoku-type.enum";

@Injectable()
export abstract class SudokuService{
    abstract Generate(type: SudokuTypeEnum): number[][];
    abstract Check(board: number[][]): boolean;
}
