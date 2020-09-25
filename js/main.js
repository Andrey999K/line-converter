const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;

const output = document.createElement("div");
output.className = "output";

const reset = document.createElement("button");
reset.className = "button";
reset.textContent = "Reset";

document.body.appendChild(canvas);
document.body.appendChild(output);
document.body.appendChild(reset);

ctx.fillStyle = "orange";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "red";
let start = false;

canvas.addEventListener("mousedown", () => {
    if (!start) {
        ctx.moveTo(event.clientX, event.clientY);
        output.insertAdjacentText("beforeend", `ctx.moveTo(${event.clientX}, ${event.clientY});`);
        output.insertAdjacentHTML("beforeEnd", "<br>");
        start = true;
    } else {
        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
        output.insertAdjacentText("beforeend", `ctx.lineTo(${event.clientX}, ${event.clientY});`);
        output.insertAdjacentHTML("beforeEnd", "<br>");
        // ctx.fill();
    }
});

reset.addEventListener("click", () => {
    ctx.closePath();
    start = false;
    output.textContent = "";
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});