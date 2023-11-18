import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataService } from 'src/app/@core/services/data.service';

@Component({
  selector: 'app-sudoku-validator',
  templateUrl: './sudoku-validator.component.html',
  styleUrls: ['./sudoku-validator.component.scss']
})
export class SudokuValidatorComponent {
  msgNotValid : string  = "Your suduko is not valid !"
  msgValid : string = "Your suduko is valid !"
  
  emptyGrid =  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  
  resultMessage: string = ""
  board: number[][] = [];
  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe(data => {
      this.board = data;
      this.resultMessage = "";
    });
  }

  onValidate(){
   this.resultMessage =  this.isValidSudoku(this.board)? this.msgValid : this.msgNotValid;
   console.log(this.board)
  }
  onGenerate(){
    this.board = []
    this.board = this.generateRandomSudoku()
    this.dataService.sendData(this.board)
  }
  
  closeMessageResponseModal() {
    this.resultMessage = ""
  }
  
  isValidSudoku(board: any) {
    if (board.length <=0){
      return false;
    }
    // Check if the board contains any zeros
    if (board.some((row: number[]) => row.includes(0))) {
        return false; // Board is invalid if it contains zeros
    }

    // Initialize sets for each row, column, and subgrid
    const rows = new Array(9).fill(null).map(() => new Set());
    const cols = new Array(9).fill(null).map(() => new Set());
    const subgrids = new Array(9).fill(null).map(() => new Set());

    // Iterate through each cell in the Sudoku board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = board[i][j];

            // Calculate the subgrid index
            const subgridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            // Check for duplicates in the current row, column, and subgrid
            if (rows[i].has(num) || cols[j].has(num) || subgrids[subgridIndex].has(num)) {
                return false; // Found a duplicate, Sudoku is invalid
            }

            // Add the number to the sets for the current row, column, and subgrid
            rows[i].add(num);
            cols[j].add(num);
            subgrids[subgridIndex].add(num);
        }
    }

    // If no duplicates and no zeros were found, the Sudoku board is valid
    return true;
  }
  
  
  emptySudokuGrid(){
    this.board = this.emptyGrid
    this.dataService.sendData(this.board)
  }

  generateRandomSudoku(): number[][] {
    // Generate a filled Sudoku puzzle
    const filledPuzzle: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    this.fillRandomCells(filledPuzzle);
  
    // Copy the filled puzzle to create a solvable puzzle
    const solvablePuzzle: number[][] = this.copySudokuPuzzle(filledPuzzle);
  
    // Remove some elements to create the puzzle for the user to solve
    this.removeElements(solvablePuzzle);
  
    return solvablePuzzle;
  }
  
/*  fillSudokuGrid(): number[][] {
    // Generate a filled Sudoku puzzle
    const filledPuzzle: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    this.fillRandomCells(filledPuzzle);

    const solvablePuzzle: number[][] = this.copySudokuPuzzle(filledPuzzle);
    
    
    return solvablePuzzle;
  }*/
  fillSudokuGrid(){
    this.board = []
    this.board = this.generateRandomFilledSudoku()
    this.dataService.sendData(this.board)
  }

  
  generateRandomFilledSudoku(): number[][] {
    // Generate a filled Sudoku puzzle
    const filledPuzzle: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    this.fillRandomCells(filledPuzzle);

    // Copy the filled puzzle to create a solvable puzzle
    const solvablePuzzle: number[][] = this.copySudokuPuzzle(filledPuzzle);

    // Remove some elements to create the puzzle for the user to solve
    //this.removeElements(solvablePuzzle);

    return solvablePuzzle;
  }
  copySudokuPuzzle(puzzle: number[][]): number[][] {
    // Deep copy the puzzle to avoid modifying the original filled puzzle
    return puzzle.map(row => [...row]);
  }
  removeElements(puzzle: number[][]): void {
    // Choose a percentage of elements to remove based on the puzzle size
    const totalCells = 9 * 9;
    const cellsToRemove = Math.floor(totalCells * 0.6); // Adjust the percentage as needed
  
    for (let i = 0; i < cellsToRemove; i++) {
      // Randomly choose a row and column to remove an element
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
  
      // Ensure the cell is not already empty
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
      } else {
        // If the chosen cell is already empty, try again
        i--;
      }
    }
  }
  fillRandomCells(board: number[][]): boolean {
    const emptyCell = this.findEmptyCell(board);

    if (!emptyCell) {
      return true; // Puzzle is filled
    }

    const [row, col] = emptyCell;
    const numbers = this.shuffleNumbers();

    for (const num of numbers) {
      if (this.isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (this.fillRandomCells(board)) {
          return true;
        }
        board[row][col] = 0; // Backtrack if the current configuration doesn't lead to a solution
      }
    }
    return false;
  }

  findEmptyCell(board: number[][]): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }

    return null;
  }

  isValidMove(board: number[][], row: number, col: number, num: number): boolean {
    return (
      !this.usedInRow(board, row, num) &&
      !this.usedInCol(board, col, num) &&
      !this.usedInSubgrid(board, row - (row % 3), col - (col % 3), num)
    );
  }

  usedInRow(board: number[][], row: number, num: number): boolean {
    return board[row].includes(num);
  }

  usedInCol(board: number[][], col: number, num: number): boolean {
    return board.some(row => row[col] === num);
  }

  usedInSubgrid(board: number[][], startRow: number, startCol: number, num: number): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return true;
        }
      }
    }

    return false;
  }

  shuffleNumbers(): number[] {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }
}

