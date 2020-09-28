const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;

const output = document.createElement("div");
output.className = "output";

const reset = document.createElement("button");
reset.className = "button";
reset.textContent = "Reset";

const fill = document.createElement("button");
fill.className = "button";
fill.textContent = "Fill";

const circle = document.createElement("button");
circle.className = "button";
circle.textContent = "Circle";

const rectangle = document.createElement("button");
rectangle.className = "button";
rectangle.textContent = "Rectangle";

const figureName = document.createElement("div");
figureName.className = "figure";
figureName.textContent = "Line";

let circ = false;
let rect = false;

let x1;
let y1;

document.body.appendChild(canvas);
document.body.appendChild(output);
document.body.appendChild(circle);
document.body.appendChild(rectangle);
document.body.appendChild(reset);
document.body.appendChild(fill);
document.body.appendChild(figureName);

ctx.fillStyle = "orange";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "red";
let start = false;

function drawEllipse(ctx, x, y, a, b) {
  // Запоминаем положение системы координат (CК) и масштаб
  ctx.save();
  ctx.beginPath();

  // Переносим СК в центр будущего эллипса
  ctx.translate(x, y);

  /*
   * Масштабируем по х.
   * Теперь нарисованная окружность вытянется в a / b раз
   * и станет эллипсом
   */

  ctx.scale(a / b, 1);

  // Рисуем окружность, которая благодаря масштабированию станет эллипсом
  ctx.arc(0, 0, b, 0, Math.PI * 2, true);

  // Восстанавливаем СК и масштаб
  ctx.restore();

  ctx.stroke();
}

const figurePaint = (elem) => {
  if (circ) {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    if (!start) {
      start = true;
      x1 = elem.clientX;
      y1 = elem.clientY;
    } else {
      let x2 = x1 > elem.clientX ? x1 - elem.clientX : elem.clientX - x1;
      let y2 = y1 > elem.clientY ? y1 - elem.clientY : elem.clientY - y1;

      let radiusX =
        x1 < elem.clientX ? (elem.clientX - x1) / 2 : (x1 - elem.clientX) / 2;
      let radiusY =
        y1 < elem.clientY ? (elem.clientY - y1) / 2 : (y1 - elem.clientY) / 2;

      ctx.beginPath();
      drawEllipse(
        ctx,
        x1 < elem.clientX ? elem.clientX - radiusX : elem.clientX + radiusX,
        y1 < elem.clientY ? elem.clientY - radiusY : elem.clientY + radiusY,
        radiusX,
        radiusY
      );

      output.innerHTML = "";
      if (radiusX == radiusY) {
        output.insertAdjacentText(
          "beforeend",
          `arc(${
            x1 < elem.clientX ? elem.clientX - radiusX : elem.clientX + radiusX
          },
             ${
               y1 < elem.clientY
                 ? elem.clientY - radiusY
                 : elem.clientY + radiusY
             },
             ${radiusX}, 0, 2*Math.PI);`
        );
        output.insertAdjacentHTML("beforeEnd", "<br>");
      } else {
        output.insertAdjacentHTML(
          "beforeend",
          `function drawEllipse(ctx, x, y, a, b) {<br>
          ctx.save();<br>
          ctx.beginPath();<br>
          ctx.translate(x, y);<br>
          ctx.scale(a / b, 1);<br>
          ctx.arc(0, 0, b, 0, Math.PI * 2, true);<br>
          ctx.restore();<br>
          ctx.stroke();<br>
        }<br>`
        );
        output.insertAdjacentHTML("beforeEnd", `ctx.beginPath();`);
        output.insertAdjacentHTML("beforeEnd", `<br>`);
        output.insertAdjacentHTML(
          "beforeEnd",
          `
        drawEllipse(ctx, ${
          x1 < elem.clientX ? elem.clientX - radiusX : elem.clientX + radiusX
        },
           ${
             y1 < elem.clientY ? elem.clientY - radiusY : elem.clientY + radiusY
           },
           ${radiusX}, ${radiusY});`
        );
        output.insertAdjacentHTML("beforeEnd", `<br>`);
      }
    }
  } else if (rect) {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    if (!start) {
      start = true;
      x1 = elem.clientX;
      y1 = elem.clientY;
    } else {
      ctx.beginPath();
      ctx.rect(
        x1 < elem.clientX ? x1 : elem.clientX,
        y1 < elem.clientY ? y1 : elem.clientY,
        x1 < elem.clientX ? elem.clientX - x1 : x1 - elem.clientX,
        y1 < elem.clientY ? elem.clientY - y1 : y1 - elem.clientY
      );
      ctx.stroke();

      output.innerHTML = "";
      output.insertAdjacentText("beforeEnd", `ctx.beginPath();`);
      output.insertAdjacentHTML("beforeEnd", "<br>");
      output.insertAdjacentText(
        "beforeEnd",
        `ctx.rect(${x1 < elem.clientX ? x1 : elem.clientX},
      ${y1 < elem.clientY ? y1 : elem.clientY},
      ${x1 < elem.clientX ? elem.clientX - x1 : x1 - elem.clientX},
      ${y1 < elem.clientY ? elem.clientY - y1 : y1 - elem.clientY});`
      );
      output.insertAdjacentHTML("beforeEnd", "<br>");
      output.insertAdjacentText("beforeEnd", `ctx.stroke();`);
      output.insertAdjacentHTML("beforeEnd", "<br>");
    }
  }
};

const mouseMove = () => {
  //   console.log(event.clientX, event.clientY);
  canvas.addEventListener("mousemove", figurePaint, event);
  canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", figurePaint);
  });
};

canvas.addEventListener("mousedown", () => {
  if (!rect && !circ) {
    if (!start) {
      ctx.beginPath();
      ctx.moveTo(event.clientX, event.clientY);
      output.insertAdjacentText("beforeend", `ctx.beginPath();`);
      output.insertAdjacentHTML("beforeEnd", "<br>");
      output.insertAdjacentText(
        "beforeend",
        `ctx.moveTo(${event.clientX}, ${event.clientY});`
      );
      output.insertAdjacentHTML("beforeEnd", "<br>");
      start = true;
    } else {
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
      output.insertAdjacentText(
        "beforeend",
        `ctx.lineTo(${event.clientX}, ${event.clientY});`
      );
      output.insertAdjacentHTML("beforeEnd", "<br>");
      // ctx.fill();
    }
  }
});

canvas.addEventListener("mousedown", mouseMove);

reset.addEventListener("click", () => {
  ctx.closePath();
  ctx.beginPath();
  start = false;
  circ = false;
  rect = false;
  output.textContent = "";
  figureName.textContent = "Line";
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
});

fill.addEventListener("click", () => {
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  output.insertAdjacentText("beforeend", `ctx.fillStyle = "red";`);
  output.insertAdjacentHTML("beforeEnd", "<br>");
  output.insertAdjacentText("beforeend", `ctx.fill();`);
  output.insertAdjacentHTML("beforeEnd", "<br>");
  output.insertAdjacentText("beforeend", `ctx.closePath();`);
  output.insertAdjacentHTML("beforeEnd", "<br>");
  start = false;
});

circle.addEventListener("click", () => {
  if (circ == false) {
    circ = true;
    rect = false;
    figureName.textContent = "Circle";
  } else {
    circ = false;
    figureName.textContent = "Line";
  }
});

rectangle.addEventListener("click", () => {
  if (rect == false) {
    rect = true;
    circ = false;
    figureName.textContent = "Rectangle";
  } else {
    rect = false;
    figureName.textContent = "Line";
  }
});
