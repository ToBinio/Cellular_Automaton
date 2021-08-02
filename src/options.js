import { gridObj } from "./script.js";
export var cellSize = 40;
var cellSizeObj = document.getElementById("cellSize");
cellSizeObj.value = Math.sqrt(cellSize).toString();
cellSizeObj.addEventListener("change", function () {
    cellSize = Math.pow(parseFloat(cellSizeObj.value), 2);
    boarderWidth = Math.pow(parseFloat(boarderNumberObj.value), 2) * cellSize;
    gridObj.createGrid();
    gridObj.draw();
});
export var aliveCellColor = "#2b2b48";
var aliveCellColorObj = document.getElementById("aliveCellColor");
aliveCellColorObj.value = aliveCellColor;
aliveCellColorObj.addEventListener("change", function () {
    aliveCellColor = aliveCellColorObj.value;
    gridObj.draw();
});
export var deadCellColor = "#899493";
var deadCellColorObj = document.getElementById("deadCellColor");
deadCellColorObj.value = deadCellColor;
deadCellColorObj.addEventListener("change", function () {
    deadCellColor = deadCellColorObj.value;
    gridObj.draw();
});
//boarder settings
export var boarderWidth = 0;
var boarderNumberObj = document.getElementById("boarderWidth");
boarderNumberObj.value = "0";
boarderNumberObj.addEventListener("change", function () {
    boarderWidth = Math.pow(parseFloat(boarderNumberObj.value), 2) * cellSize;
    console.log(boarderWidth);
    gridObj.draw();
});
export var boarderColor = "#000000";
var boarderColorObj = document.getElementById("boarderColor");
boarderColorObj.value = boarderColor;
boarderColorObj.addEventListener("change", function () {
    boarderColor = boarderColorObj.value;
    gridObj.draw();
});
export var lifeEvent;
(function (lifeEvent) {
    lifeEvent[lifeEvent["birth"] = 0] = "birth";
    lifeEvent[lifeEvent["death"] = 1] = "death";
    lifeEvent[lifeEvent["survival"] = 2] = "survival";
})(lifeEvent || (lifeEvent = {}));
export var lifeOptions = [
    lifeEvent.death,
    lifeEvent.death,
    lifeEvent.survival,
    lifeEvent.birth,
    lifeEvent.death,
    lifeEvent.death,
    lifeEvent.death,
    lifeEvent.death,
    lifeEvent.death,
    lifeEvent.death,
];
