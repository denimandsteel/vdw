'use strict';
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const circleCount = 2;
const speedMultiplier = 2;

const { innerWidth, innerHeight } = window;

const gradients = [
  {
    start: '#ABDCFF',
    stop: '#0396FF'
  }, {
    start: '#FFF6B7',
    stop: "#F6416C"
  }, {
    start: "#736EFE",
    stop: "#5EFCE8"
  }
]

function Circle (x, y, dx, dy, radius, index) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  // const gradient = ctx.createLinearGradient(0, 0, radius, radius);
  // gradient.addColorStop(0.1, gradients[index].start);
  // gradient.addColorStop(1, gradients[index].stop);

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = gradients[index].stop;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.closePath();
  }

  this.update = function() {
    if(this.x > canvas.width || this.x < 0) {
      this.dx = -this.dx;
    }

    if(this.y > canvas.height || this.y < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circlesArray = [];

for (let i = 0; i < circleCount; i += 1) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = (Math.random() - 0.5) * speedMultiplier;
  let dy = (Math.random() - 0.5) * speedMultiplier;
  let radius = 500;

  circlesArray.push(new Circle(x, y, dx, dy, radius, i));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circlesArray.length; i += 1) {
    circlesArray[i].update();
  }
}

animate();

const setCanvasDimensions = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const handleOnLoad = () => {
  setCanvasDimensions();
}

document.addEventListener("load", handleOnLoad());
document.addEventListener("resize", () => {
  const deboucer = setTimeout(() => {
    setCanvasDimensions();
  }, 10);

  return () => clearTimeout(deboucer);
});
