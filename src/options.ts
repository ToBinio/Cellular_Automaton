import { gridObj } from "./script.js";

export let cellSize = 40;
let cellSizeObj = document.getElementById("cellSize")! as HTMLInputElement;

cellSizeObj.value = Math.sqrt(cellSize).toString();
cellSizeObj.addEventListener("change", function () {
  cellSize = Math.pow(parseFloat(cellSizeObj.value), 2);
  boarderWidth = Math.pow(parseFloat(boarderNumberObj.value), 2) * cellSize;
  gridObj.createGrid();
  gridObj.draw();
});

export let aliveCellColor = "#2b2b48";
let aliveCellColorObj = document.getElementById(
  "aliveCellColor"
)! as HTMLInputElement;

aliveCellColorObj.value = aliveCellColor;
aliveCellColorObj.addEventListener("change", function () {
  aliveCellColor = aliveCellColorObj.value;
  gridObj.draw();
});

export let deadCellColor = "#899493";
let deadCellColorObj = document.getElementById(
  "deadCellColor"
)! as HTMLInputElement;

deadCellColorObj.value = deadCellColor;
deadCellColorObj.addEventListener("change", function () {
  deadCellColor = deadCellColorObj.value;
  gridObj.draw();
});

//boarder settings
export let boarderWidth = 0;
let boarderNumberObj = document.getElementById(
  "boarderWidth"
)! as HTMLInputElement;

boarderNumberObj.value = "0";
boarderNumberObj.addEventListener("change", function () {
  boarderWidth = Math.pow(parseFloat(boarderNumberObj.value), 2) * cellSize;
  console.log(boarderWidth);
  gridObj.draw();
});

export let boarderColor = "#000000";
let boarderColorObj = document.getElementById(
  "boarderColor"
)! as HTMLInputElement;

boarderColorObj.value = boarderColor;
boarderColorObj.addEventListener("change", function () {
  boarderColor = boarderColorObj.value;
  gridObj.draw();
});

export enum lifeEvent {
  birth,
  death,
  survival,
}

export let lifeOptions = [
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
