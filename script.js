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
      cell.addEventListener("mousedown", (e) => colorCell(e));
      cell.addEventListener("mouseenter", (e) => colorCell(e));
      cell.addEventListener("pointerdown", (e) => handlePointerDown(e));
      cell.addEventListener("pointerenter", (e) => colorCell(e));
      row.append(cell);
    }
    container.append(row);
  }
}
drawGrid();

let mouseDown = false;
container.onmousedown = () => (mouseDown = true);
container.onpointerdown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);
container.onpointerup = () => (mouseDown = false);
window.ondragstart = () => false;
window.ondrop = () => false;

function handlePointerDown(e) {
  console.log("pointer event");
  e.target.releasePointerCapture(e.pointerId);
}

function colorCell(e) {
  if (!mouseDown && e.type === "mouseenter") return;

  const cell = e.target;
  if (
    currentMode === "erase" ||
    !currentFade ||
    !cell.hasAttribute("style") ||
    cell.classList.contains("recolor")
  ) {
    applyColor(cell);
  }
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
  cell.classList.remove("recolor");
}

function applyFade(cell) {
  const rgbValues = cell.style.backgroundColor.match(/[\d.]+/g);
  if (rgbValues.length === 3) {
    rgbValues.push(0.1);
  } else {
    const alpha = parseFloat(rgbValues[3]);
    rgbValues[3] = Math.min(0.99, alpha + 0.1);
  }
  cell.style.backgroundColor = `rgba(${rgbValues.join(", ")})`;
}

function toggleRecolor() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.hasAttribute("style")) {
      cell.classList.add("recolor");
    }
  });
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
  if (currentMode !== "erase") {
    toggleRecolor();
  }
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
