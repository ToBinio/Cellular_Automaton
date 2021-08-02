import { lifeEvent, cellSize, lifeOptions, boarderWidth, boarderColor, deadCellColor, aliveCellColor, } from "./options.js";
var grid = /** @class */ (function () {
    function grid(canvas) {
        this.gridArray = [];
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.createGrid();
    }
    grid.prototype.draw = function () {
        var _this = this;
        this.fillBackground();
        this.canvasContext.strokeStyle = boarderColor;
        this.canvasContext.lineWidth = boarderWidth;
        var gridArray = this.gridArray;
        gridArray.forEach(function (row, rowIndex) {
            row.forEach(function (mode, columnIndex) {
                //draw living and newDead celes
                if (mode != state.dead) {
                    if (mode == state.alive) {
                        _this.canvasContext.fillStyle = aliveCellColor;
                    }
                    else {
                        _this.canvasContext.fillStyle = deadCellColor;
                    }
                    _this.canvasContext.fillRect(columnIndex * cellSize, rowIndex * cellSize, cellSize + 0.5, cellSize + 0.5);
                }
                if (boarderWidth != 0) {
                    //drawing grid
                    _this.canvasContext.strokeRect(columnIndex * cellSize, rowIndex * cellSize, cellSize, cellSize);
                }
            });
        });
    };
    grid.prototype.gridcellSizer = function () {
        var height = Math.round(this.canvas.height / cellSize);
        var width = Math.round(this.canvas.width / cellSize);
        this.canvas.height = height * cellSize;
        this.canvas.width = width * cellSize;
        document.getElementById("cellCount").innerText = "Cell count: " + height * width;
        return [height, width];
    };
    grid.prototype.createGrid = function () {
        var _this = this;
        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = window.innerHeight * 0.7;
        var cellSize = this.gridcellSizer();
        //add rows
        if (this.gridArray.length < cellSize[0])
            for (var row = this.gridArray.length; row < cellSize[0]; row++) {
                this.gridArray.push([]);
                this.gridArray.forEach(function (value, row) {
                    for (var column = _this.gridArray[row].length; column < cellSize[1]; column++) {
                        if (Math.random() < 0.5)
                            _this.gridArray[row].push(state.dead);
                        else
                            _this.gridArray[row].push(state.alive);
                    }
                });
            }
        else {
            this.gridArray.splice(cellSize[0], this.gridArray.length);
        }
        //add columns
        if (this.gridArray[0].length < cellSize[1]) {
            this.gridArray.forEach(function (value, row) {
                for (var column = _this.gridArray[row].length; column < cellSize[1]; column++) {
                    if (Math.random() < 0.5)
                        _this.gridArray[row].push(state.dead);
                    else
                        _this.gridArray[row].push(state.alive);
                }
            });
        }
        else {
            this.gridArray.forEach(function (value, row) {
                _this.gridArray[row].splice(cellSize[1], value.length);
            });
        }
    };
    grid.prototype.getNeighborsCount = function (row, column) {
        var neiborsCount = 0;
        for (var rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
            for (var columnIndex = column - 1; columnIndex <= column + 1; columnIndex++) {
                if (!(rowIndex == row && columnIndex == column)) {
                    var rowIndexChange = rowIndex;
                    var columnIndexChange = columnIndex;
                    if (rowIndexChange < 0)
                        rowIndexChange = this.gridArray.length - 1;
                    if (columnIndexChange < 0)
                        columnIndexChange = this.gridArray[0].length - 1;
                    if (rowIndexChange > this.gridArray.length - 1)
                        rowIndexChange = 0;
                    if (columnIndexChange > this.gridArray[0].length - 1)
                        columnIndexChange = 0;
                    if (this.gridArray[rowIndexChange][columnIndexChange] == state.alive)
                        neiborsCount++;
                }
            }
        }
        return neiborsCount;
    };
    grid.prototype.fillBackground = function () {
        var canvasContext = this.canvasContext;
        canvasContext.fillStyle = "#b7bcb6";
        canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    grid.prototype.computeNextGrid = function () {
        var _this = this;
        var gridArrayClone = JSON.parse(JSON.stringify(this.gridArray));
        this.gridArray.forEach(function (row, rowIndex) {
            row.forEach(function (mode, columnIndex) {
                var option = lifeOptions[_this.getNeighborsCount(rowIndex, columnIndex)];
                if (option == lifeEvent.death) {
                    //cell will be dead
                    if (mode == state.alive)
                        gridArrayClone[rowIndex][columnIndex] = state.newDead;
                    else
                        gridArrayClone[rowIndex][columnIndex] = state.dead;
                }
                else if (option == lifeEvent.birth) {
                    //cell will be born
                    gridArrayClone[rowIndex][columnIndex] = state.alive;
                }
                else if (mode == state.newDead) {
                    gridArrayClone[rowIndex][columnIndex] = state.dead;
                }
            });
        });
        this.gridArray = gridArrayClone;
    };
    grid.prototype.resetGrid = function () {
        this.gridArray = [];
    };
    return grid;
}());
export { grid };
var state;
(function (state) {
    state[state["alive"] = 0] = "alive";
    state[state["newDead"] = 1] = "newDead";
    state[state["dead"] = 2] = "dead";
})(state || (state = {}));
