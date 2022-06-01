const DEFAULT_FADE = false;
const DEFAULT_MODE = "black";
const DEFAULT_SIZE = 15;

let currentFade = DEFAULT_FADE;
let currentMode = DEFAULT_MODE;
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
      cell.addEventListener("pointerdown", (e) => colorCell(e));
      cell.addEventListener("pointerenter", (e) => colorCell(e));
      row.append(cell);
    }
    container.append(row);
  }
}
drawGrid();

let mouseDown = false;
container.onpointerdown = () => (mouseDown = true);
container.onpointerup = () => (mouseDown = false);
window.ondragstart = () => false;
window.ondrop = () => false;

function colorCell(e) {
  if (!mouseDown && e.type === "pointerenter") return;
  if (e.type === "pointerdown") {
    e.target.releasePointerCapture(e.pointerId);
  }

  const cell = e.target;
  applyColor(cell);
  if (currentFade) {
    applyFade(cell);
  }
}

function randomRGBValue() {
  return Math.floor(Math.random() * 255);
}

function randomColor() {
  const randR = randomRGBValue();
  const randG = randomRGBValue();
  const randB = randomRGBValue();
  return `rgb(${randR}, ${randG}, ${randB})`;
}

function applyColor(cell) {
  let newColor = "rgb(0, 0, 0)";
  if (currentMode === "erase") {
    newColor = "rgb(255, 255, 255)";
  } else if (currentMode === "random") {
    newColor = randomColor();
  }
  cell.style.backgroundColor = newColor;
}

function applyFade(cell) {
  const opacity = cell.style.opacity;
  if (currentMode === "erase") {
    cell.style.opacity = null;
  } else if (opacity == 0) {
    cell.style.opacity = 0.1;
  } else if (opacity < 1) {
    const newOpacity = Math.min(1, parseFloat(opacity) + 0.1);
    cell.style.opacity = newOpacity;
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
const modeButtons = document.querySelectorAll(".mode");
const fadeButton = document.querySelector(".fade");
const resetButton = document.querySelector(".reset");

modeButtons.forEach((button) => (button.onclick = (e) => changeMode(e)));
fadeButton.onclick = (e) => toggleFade(e);
resetButton.onclick = () => redrawGrid();

function changeMode(e) {
  currentMode = e.target.name;

  modeButtons.forEach((button) => button.classList.remove("toggled"));
  e.target.classList.add("toggled");
}

function toggleFade(e) {
  e.target.classList.toggle("toggled");
  currentFade = !currentFade;
}

/* SLIDER */
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");

sizeSlider.oninput = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => redrawGrid();

function updateSizeValue(value) {
  currentSize = value;
  sizeValue.textContent = `${value} x ${value}`;
}
