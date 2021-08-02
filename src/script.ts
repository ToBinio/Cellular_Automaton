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
let timeDealy = 100;

let timeDealyObj = document.getElementById("autplayTime")! as HTMLInputElement;

timeDealyObj.value = Math.sqrt(timeDealy).toString();
timeDealyObj.addEventListener("change", function () {
  timeDealy = Math.pow(parseFloat(timeDealyObj.value), 2);
  if (
    (document.getElementById("autoPlayChecker")! as HTMLInputElement).checked
  ) {
    clearInterval(timer);
    startTimer();
  }
});

document
  .getElementById("autoPlayChecker")!
  .addEventListener("change", function () {
    if (
      (document.getElementById("autoPlayChecker")! as HTMLInputElement).checked
    ) {
      startTimer();
    } else {
      clearInterval(timer);
    }
  });

function startTimer() {
  timer = setInterval(function () {
    gridObj.computeNextGrid();
    gridObj.draw();
  }, timeDealy);
}
