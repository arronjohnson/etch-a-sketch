const DEFAULT_SIZE = 50;

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
window.onmousedown = () => (mouseDown = true);
window.onmouseup = () => (mouseDown = false);
window.ondragstart = () => false;
window.ondrop = () => false;

function colorCell(e) {
  if (!mouseDown && e.type === "mouseenter") return;
  e.target.classList.add("active");
}

function clearGrid() {
  container.innerHTML = "";
}

function redrawGrid() {
  clearGrid();
  drawGrid();
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
