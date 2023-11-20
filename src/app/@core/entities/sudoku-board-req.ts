import { SourceEnum } from "../enumerations/source-enum";
import { SudokuTypeEnum } from "../enumerations/sudoku-type.enum";

export class SudokuBoardReq{
    data: any;
    source: SourceEnum = SourceEnum.BUTTON;
    type: SudokuTypeEnum = SudokuTypeEnum.EMPTY;
}