const DEFAULT_SIZE = 16;

let currentSize = DEFAULT_SIZE;

const container = document.querySelector(".grid");
for (let i = 0; i < currentSize; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < currentSize; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mousedown", (e) => onClick(e));
    cell.addEventListener("mouseenter", (e) => onMouseEnter(e));
    row.append(cell);
  }
  container.append(row);
}

let mouseDown = false;
window.onmousedown = () => (mouseDown = true);
window.onmouseup = () => (mouseDown = false);
window.ondragstart = () => false;
window.ondrop = () => false;

function onClick(e) {
  colorCell(e.target);
}

function onMouseEnter(e) {
  if (!mouseDown) return;
  colorCell(e.target);
}

function colorCell(cell) {
  cell.classList.add("active");
}
