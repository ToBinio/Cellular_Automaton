import { state } from "./grid.js";
import { cellSize } from "./options.js";
import { gridObj } from "./script.js";
gridObj.gridArray[0][0] = state.alive;
gridObj.draw();
gridObj.canvas.onmousedown = function (e) {
    var pos = {
        row: Math.round((e.offsetY - cellSize / 2) / cellSize),
        column: Math.round((e.offsetX - cellSize / 2) / cellSize),
    };
    if (gridObj.gridArray[pos.row][pos.column] == state.alive) {
        gridObj.gridArray[pos.row][pos.column] = state.dead;
    }
    else {
        gridObj.gridArray[pos.row][pos.column] = state.alive;
    }
    gridObj.draw();
};
