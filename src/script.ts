import { grid } from "./grid.js";

export let gridObj = new grid(
  document.getElementById("canvas") as HTMLCanvasElement
);

gridObj.draw();

window.addEventListener(
  "resize",
  function () {
    gridObj.createGrid();
    gridObj.draw();
  },
  true
);

document.getElementById("nextButton")!.addEventListener("click", function () {
  gridObj.computeNextGrid();
  gridObj.draw();
});

document.getElementById("resetButton")!.addEventListener("click", function () {
  gridObj.resetGrid();
  gridObj.createGrid();
  gridObj.draw();
});

//outoPlay
let timer: number;

document
  .getElementById("autoPlayChecker")!
  .addEventListener("change", function () {
    if (
      (document.getElementById("autoPlayChecker")! as HTMLInputElement).checked
    ) {
      timer = setInterval(function () {
        gridObj.computeNextGrid();
        gridObj.draw();
      }, 100);
    } else {
      clearInterval(timer);
    }
  });
