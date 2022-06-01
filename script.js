const DEFAULT_MODE = "black";
const DEFAULT_SIZE = 50;

let currentMode = "rainbow";
let currentSize = DEFAULT_SIZE;

/* GRID */
const container = document.querySelector(".grid");

function drawGrid() {
  for (let i = 0; i < currentSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < currentSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("mousedown", (e) => colorCell(e));
      cell.addEventListener("mouseenter", (e) => colorCell(e));
      row.append(cell);
    }
    container.append(row);
  }
}
drawGrid();

let mouseDown = false;
container.onmousedown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);
window.ondragstart = () => false;
window.ondrop = () => false;

function randomRGBValue() {
  return Math.floor(Math.random() * 255);
}

function randomColor() {
  const randR = randomRGBValue();
  const randG = randomRGBValue();
  const randB = randomRGBValue();
  return `rgba(${randR}, ${randG}, ${randB}, 1)`;
}

function colorCell(e) {
  if (!mouseDown && e.type === "mouseenter") return;
  // e.target.classList.add("active");

  switch (currentMode) {
    case "rainbow":
      e.target.style.backgroundColor = randomColor();
      break;
    default:
      e.target.style.backgroundColor = "black";
  }
}

function clearGrid() {
  container.innerHTML = "";
}

function redrawGrid() {
  clearGrid();
  drawGrid();
}

/* BUTTONS */
const resetButton = document.querySelector(".reset");

resetButton.onclick = () => redrawGrid();

/* SLIDER */
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");

sizeSlider.oninput = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => redrawGrid();

function updateSizeValue(value) {
  currentSize = value;
  sizeValue.textContent = `${value} x ${value}`;
}
