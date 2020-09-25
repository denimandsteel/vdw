'use strict';
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const circleCount = 1;
const speedMultiplier = 2;

const { innerWidth, innerHeight } = window;

const gradients = [
  {
    start: 'rgba(200,1,1,0.8)',
    stop: 'rgba(200,1,1,0)'
  }, 
  {
    start: 'rgba(219,1,104,1)',
    stop: "rgba(219,1,104,0.0)"
  },
  {
    start: "rgba(233,161,38,1)",
    stop: "rgba(233,161,38,0.6)"
  },  {
    start: "rgba(212,16,16,0.7)",
    stop: "rgba(212,16,16,0)"
  }
]

function Circle (x, y, dx, dy, radius, index) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  const gradient = ctx.createRadialGradient(
    this.x, this.y, 0, 
    this.x, this.y, radius);
  gradient.addColorStop(0, gradients[index].start);
  gradient.addColorStop(1, gradients[index].stop);

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = gradient;

    ctx.fill();
    ctx.closePath();
  }

  // this.update = function() {
  //   if(this.x > canvas.width || this.x < 0) {
  //     this.dx = -this.dx;
  //   }

  //   if(this.y > canvas.height || this.y < 0) {
  //     this.dy = -this.dy;
  //   }

    // this.x += this.dx;
    // this.y += this.dy;

  //   this.draw();
  // }
}

const circlesArray = [
  new Circle(
    0.95 * innerWidth,
    0.15 * innerHeight,
    (Math.random() - 0.5) * speedMultiplier,
    (Math.random() - 0.5) * speedMultiplier,
    500,
    0),
  new Circle(
    0.45 * innerWidth,
    0.66 * innerHeight,
    (Math.random() - 0.5) * speedMultiplier,
    (Math.random() - 0.5) * speedMultiplier,
    400,
    1),
  new Circle(
    0.25 * innerWidth,
    0.75 * innerHeight,
    
    (Math.random() - 0.5) * speedMultiplier,
    (Math.random() - 0.5) * speedMultiplier,
    400,
    2),
  new Circle(
    0.78 * innerWidth,
    0.95 * innerHeight,
    (Math.random() - 0.5) * speedMultiplier,
    (Math.random() - 0.5) * speedMultiplier,
    600,
    3),
  ];

function animate() {
  circlesArray[0].draw();
  circlesArray[1].draw();
  circlesArray[2].draw();
  circlesArray[3].draw();
}
setTimeout(() => {
  animate();
}, 1);

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
