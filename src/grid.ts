import {
  lifeEvent,
  cellSize,
  lifeOptions,
  boarderWidth,
  boarderColor,
  deadCellColor,
  aliveCellColor,
} from "./options.js";

export class grid {
  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  gridArray: Array<Array<state>> = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.createGrid();
  }

  draw() {
    this.fillBackground();

    this.canvasContext.strokeStyle = boarderColor;
    this.canvasContext.lineWidth = boarderWidth;

    let gridArray = this.gridArray;

    gridArray.forEach((row, rowIndex) => {
      row.forEach((mode, columnIndex) => {
        //draw living and newDead celes
        if (mode != state.dead) {
          if (mode == state.alive) {
            this.canvasContext.fillStyle = aliveCellColor;
          } else {
            this.canvasContext.fillStyle = deadCellColor;
          }
          this.canvasContext.fillRect(
            columnIndex * cellSize,
            rowIndex * cellSize,
            cellSize,
            cellSize
          );
        }

        if (boarderWidth != 0) {
          //drawing grid
          this.canvasContext.strokeRect(
            columnIndex * cellSize,
            rowIndex * cellSize,
            cellSize,
            cellSize
          );
        }
      });
    });
  }

  gridcellSizer(): [number, number] {
    let height = Math.round(this.canvas.height / cellSize);
    let width = Math.round(this.canvas.width / cellSize);

    this.canvas.height = height * cellSize;
    this.canvas.width = width * cellSize;

    document.getElementById("cellCount")!.innerText = `Cell count:
     ${height * width}`;
    return [height, width];
  }
  createGrid() {
    this.canvas.width = window.innerWidth * 0.8;
    this.canvas.height = window.innerHeight * 0.7;

    let cellSize = this.gridcellSizer();

    //add rows
    if (this.gridArray.length < cellSize[0])
      for (let row = this.gridArray.length; row < cellSize[0]; row++) {
        this.gridArray.push([]);
        this.gridArray.forEach((value, row) => {
          for (
            let column = this.gridArray[row].length;
            column < cellSize[1];
            column++
          ) {
            if (Math.random() < 0.5) this.gridArray[row].push(state.dead);
            else this.gridArray[row].push(state.alive);
          }
        });
      }
    else {
      this.gridArray.splice(cellSize[0], this.gridArray.length);
    }

    //add columns
    if (this.gridArray[0].length < cellSize[1]) {
      this.gridArray.forEach((value, row) => {
        for (
          let column = this.gridArray[row].length;
          column < cellSize[1];
          column++
        ) {
          if (Math.random() < 0.5) this.gridArray[row].push(state.dead);
          else this.gridArray[row].push(state.alive);
        }
      });
    } else {
      this.gridArray.forEach((value, row) => {
        this.gridArray[row].splice(cellSize[1], value.length);
      });
    }
  }

  getNeighborsCount(row: number, column: number): number {
    let neiborsCount = 0;
    for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
      for (
        let columnIndex = column - 1;
        columnIndex <= column + 1;
        columnIndex++
      ) {
        if (!(rowIndex == row && columnIndex == column)) {
          let rowIndexChange = rowIndex;
          let columnIndexChange = columnIndex;

          if (rowIndexChange < 0) rowIndexChange = this.gridArray.length - 1;
          if (columnIndexChange < 0)
            columnIndexChange = this.gridArray[0].length - 1;

          if (rowIndexChange > this.gridArray.length - 1) rowIndexChange = 0;
          if (columnIndexChange > this.gridArray[0].length - 1)
            columnIndexChange = 0;

          if (this.gridArray[rowIndexChange][columnIndexChange] == state.alive)
            neiborsCount++;
        }
      }
    }
    return neiborsCount;
  }
  fillBackground() {
    let canvasContext = this.canvasContext;

    //canvasContext.fillStyle = "#b7bcb6";
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  computeNextGrid() {
    let gridArrayClone = JSON.parse(JSON.stringify(this.gridArray));

    this.gridArray.forEach((row, rowIndex) => {
      row.forEach((mode, columnIndex) => {
        let option = lifeOptions[this.getNeighborsCount(rowIndex, columnIndex)];
        if (option == lifeEvent.death) {
          //cell will be dead
          if (mode == state.alive)
            gridArrayClone[rowIndex][columnIndex] = state.newDead;
          else gridArrayClone[rowIndex][columnIndex] = state.dead;
        } else if (option == lifeEvent.birth) {
          //cell will be born
          gridArrayClone[rowIndex][columnIndex] = state.alive;
        } else if (mode == state.newDead) {
          gridArrayClone[rowIndex][columnIndex] = state.dead;
        }
      });
    });

    this.gridArray = gridArrayClone;
  }

  resetGrid() {
    this.gridArray = [];
  }
}

enum state {
  alive,
  newDead,
  dead,
}
