import { state } from "./grid.js";
import { cellSize } from "./options.js";
import { gridObj } from "./script.js";
gridObj.gridArray[0][0] = state.alive;
gridObj.draw();
var mode = state.dead;
var drawing = false;
gridObj.canvas.onmousedown = function (e) {
    var pos = {
        row: Math.round((e.offsetY - cellSize / 2) / cellSize),
        column: Math.round((e.offsetX - cellSize / 2) / cellSize),
    };
    if (gridObj.gridArray[pos.row][pos.column] == state.alive) {
        mode = state.dead;
    }
    else
        mode = state.alive;
    draw(mode, pos.row, pos.column);
    drawing = true;
};
window.onmouseup = function (e) {
    drawing = false;
};
gridObj.canvas.onmousemove = function (e) {
    if (!drawing)
        return;
    var pos = {
        row: Math.round((e.offsetY - cellSize / 2) / cellSize),
        column: Math.round((e.offsetX - cellSize / 2) / cellSize),
    };
    draw(mode, pos.row, pos.column);
};
function draw(mode, row, column) {
    gridObj.gridArray[row][column] = mode;
    gridObj.draw();
}
