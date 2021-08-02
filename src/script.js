import { grid } from "./grid.js";
export var gridObj = new grid(document.getElementById("canvas"));
gridObj.draw();
window.addEventListener("resize", function () {
    gridObj.createGrid();
    gridObj.draw();
}, true);
document.getElementById("nextButton").addEventListener("click", function () {
    gridObj.computeNextGrid();
    gridObj.draw();
});
document.getElementById("resetButton").addEventListener("click", function () {
    gridObj.resetGrid();
    gridObj.createGrid();
    gridObj.draw();
});
//outoPlay
var timer;
document
    .getElementById("autoPlayChecker")
    .addEventListener("change", function () {
    if (document.getElementById("autoPlayChecker").checked) {
        timer = setInterval(function () {
            gridObj.computeNextGrid();
            gridObj.draw();
        }, 100);
    }
    else {
        clearInterval(timer);
    }
});
