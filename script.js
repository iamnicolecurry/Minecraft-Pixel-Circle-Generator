let canvas = document.getElementById("canvas");
let cells = [];
let rows = canvas.clientHeight / 30;
let cols = canvas.clientWidth / 30;

for (let i = 1; i < rows; i++) {
  for (let j = 1; j < cols; j++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.id = "cell-" + i + "-" + j;
    canvas.appendChild(cell);
    cells.push(cell);
  }
}

let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");
let typeInput = document.getElementById("type");

widthInput.addEventListener("change", function () {
  heightInput.value = widthInput.value;
  drawCircle();
});

heightInput.addEventListener("change", function () {
  widthInput.value = heightInput.value;
  drawCircle();
});
typeInput.addEventListener("change", drawCircle);

drawCircle();

function drawCircle() {
  cells.forEach((cell) => cell.classList.remove("circle"));

  let width = parseInt(widthInput.value);
  let height = parseInt(heightInput.value);
  let type = typeInput.value;

  let centerX = Math.floor(cols / 2);
  let centerY = Math.floor(rows / 2);
  let radiusX = Math.floor(width / 2);
  let radiusY = Math.floor(height / 2);

  let x = radiusX;
  let y = 0;
  let dx = 1 - 2 * radiusX;
  let dy = 1;
  let err = dx + dy;

  while (x >= y) {
    if (type === "thin") {
      drawPixel(centerX + x, centerY + y);
      drawPixel(centerX - x, centerY + y);
      drawPixel(centerX + x, centerY - y);
      drawPixel(centerX - x, centerY - y);
      drawPixel(centerX + y, centerY + x);
      drawPixel(centerX - y, centerY + x);
      drawPixel(centerX + y, centerY - x);
      drawPixel(centerX - y, centerY - x);
    } else if (type === "thick") {
      drawPixel(centerX + x, centerY + y);
      drawPixel(centerX + x - 1, centerY + y);
      drawPixel(centerX - x, centerY + y);
      drawPixel(centerX - x + 1, centerY + y);
      drawPixel(centerX + x, centerY - y);
      drawPixel(centerX + x - 1, centerY - y);
      drawPixel(centerX - x, centerY - y);
      drawPixel(centerX - x + 1, centerY - y);
      drawPixel(centerX + y, centerY + x);
      drawPixel(centerX + y, centerY + x - 1);
      drawPixel(centerX - y, centerY + x);
      drawPixel(centerX - y, centerY + x - 1);
      drawPixel(centerX + y, centerY - x);
      drawPixel(centerX + y, centerY - x + 1);
      drawPixel(centerX - y, centerY - x);
      drawPixel(centerX - y, centerY - x + 1);
    } else if (type === "filled") {
      for (let i = centerX - x; i <= centerX + x; i++) {
        drawPixel(i, centerY + y);
        drawPixel(i, centerY - y);
      }
      for (let i = centerX - y; i <= centerX + y; i++) {
        drawPixel(i, centerY + x);
        drawPixel(i, centerY - x);
      }
    }

    if (err <= 0) {
      y++;
      dy += 2;
      err += dy;
    }
    if (err > 0) {
      x--;
      dx += 2;
      err += dx;
    }
  }

  function drawPixel(x, y) {
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      let cell = document.getElementById("cell-" + y + "-" + x);
      cell.classList.add("circle");
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let currentYear = new Date().getFullYear();
  document.getElementById("currentYear").innerText = currentYear;
});
