const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");
const runButton = document.getElementById("run-sim");
const scoreLeftP = document.getElementById("score-left");
const scoreRightP = document.getElementById("score-right");

/* Constants */
const HEIGHT = 350;
const WIDTH = 600;
const SPEED = 3;

const BOXSIZE = 8;
const BARSIZE = 80;
const BARWIDTH = 10;
const FIELDPADDING = 5;

/* Variables */
let scoreLeft = 0;
let scoreRight = 0;

let posX = WIDTH / 2 - BOXSIZE / 2;
let posY = HEIGHT / 2 - BOXSIZE / 2;

let leftY = HEIGHT / 2 - BARSIZE / 2;
let rightY = HEIGHT / 2 - BARSIZE / 2;

let movX = 1;
let movY = 1;

// Field
ctx.beginPath();
ctx.moveTo(WIDTH / 2, 0);
ctx.lineTo(WIDTH / 2, HEIGHT);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, HEIGHT / 6);
ctx.lineTo(WIDTH, HEIGHT / 6);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, (HEIGHT * 5) / 6);
ctx.lineTo(WIDTH, (HEIGHT * 5) / 6);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(WIDTH / 8, HEIGHT / 2);
ctx.lineTo((WIDTH * 7) / 8, HEIGHT / 2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(WIDTH / 8, HEIGHT / 6);
ctx.lineTo(WIDTH / 8, (HEIGHT * 5) / 6);
ctx.stroke();

ctx.beginPath();
ctx.moveTo((WIDTH * 7) / 8, HEIGHT / 6);
ctx.lineTo((WIDTH * 7) / 8, (HEIGHT * 5) / 6);
ctx.stroke();

// Ball and Bars
ctx.fillStyle = "red";
ctx.fillRect(posX, posY, BOXSIZE, BOXSIZE);

ctx.fillStyle = "black";
ctx.fillRect(FIELDPADDING, rightY, BARWIDTH, BARSIZE);
ctx.fillRect(WIDTH - BARWIDTH - FIELDPADDING, leftY, BARWIDTH, BARSIZE);

const handleBounce = (posX, posY) => {
  /* Gone right */
  if (posX + BOXSIZE >= WIDTH) {
    movX = -1;
    scoreLeft += 1;
    // console.log("Gone right!");
  }

  /* Gone left */
  if (posX <= 0) {
    movX = 1;
    scoreRight += 1;
    // console.log("Gone left!");
  }
  /* Right handlers */
  if (
    posX + BOXSIZE == WIDTH - BARWIDTH - FIELDPADDING &&
    posY + BOXSIZE > rightY &&
    posY < rightY + BARSIZE
  ) {
    movX = -1;
    // console.log("Bounce right");
  }

  /* Left handlers */
  if (
    posX <= BARWIDTH + FIELDPADDING &&
    posY + BOXSIZE >= leftY &&
    posY <= leftY + BARSIZE
  ) {
    movX = 1;
    // console.log("Bounce left");
  }

  /* Vertical bounce */
  if (posY + BOXSIZE >= HEIGHT) {
    movY = -1;
    // console.log("Bounce up");
  }

  if (posY <= 0) {
    movY = 1;
    // console.log("Bounce down");
  }
};

const drawItems = () => {
  drawField();

  // Render bars
  ctx.fillStyle = "black";
  ctx.fillRect(FIELDPADDING, leftY, BARWIDTH, BARSIZE);
  ctx.fillRect(WIDTH - BARWIDTH - FIELDPADDING, rightY, BARWIDTH, BARSIZE);

  // Render ball
  ctx.fillStyle = "red";
  ctx.fillRect(posX, posY, BOXSIZE, BOXSIZE);
};

const drawField = () => {
  ctx.beginPath();
ctx.moveTo(WIDTH / 2, 0);
ctx.lineTo(WIDTH / 2, HEIGHT);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, HEIGHT / 6);
ctx.lineTo(WIDTH, HEIGHT / 6);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, (HEIGHT * 5) / 6);
ctx.lineTo(WIDTH, (HEIGHT * 5) / 6);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(WIDTH / 8, HEIGHT / 2);
ctx.lineTo((WIDTH * 7) / 8, HEIGHT / 2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(WIDTH / 8, HEIGHT / 6);
ctx.lineTo(WIDTH / 8, (HEIGHT * 5) / 6);
ctx.stroke();

ctx.beginPath();
ctx.moveTo((WIDTH * 7) / 8, HEIGHT / 6);
ctx.lineTo((WIDTH * 7) / 8, (HEIGHT * 5) / 6);
ctx.stroke();
};

const checkWinner = () => {
  if (
    (Math.abs(scoreLeft - scoreRight) >= 2 && scoreLeft >= 5) ||
    scoreRight >= 5
  ) {
    if (scoreLeft > scoreRight) {
      title.innerText = "Left wins!";
      clearInterval(sim);
    }
    if (scoreLeft < scoreRight) {
      title.innerText = "Right wins!";
      clearInterval(sim);
    }
  }
};

const calculateRender = (speed) => {
  for (let i = 0; i < speed; i++) {
    posX += movX;
    posY += movY;
    handleBounce(posX, posY);
  }
};

/* Game running */
let sim;
const startGame = () => {
  sim = setInterval(() => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    calculateRender(SPEED);
    drawItems();
    checkWinner();

    scoreLeftP.innerText = scoreLeft;
    scoreRightP.innerText = scoreRight;
  }, 16);
};

const toggleRender = () => {
  if (!sim) {
    startGame();
    runButton.innerText = "Stop";
  } else {
    clearInterval(sim);
    runButton.innerText = "Start";
    sim = false;
  }
};

runButton.onclick = toggleRender;
document.addEventListener("keypress", (event) => {
  const key = event.key.toLowerCase();
  if (key === "a" && leftY > 0) {
    leftY -= 10;
  }
  if (key === "z" && leftY < HEIGHT - BARSIZE) {
    leftY += 10;
  }
  if (key === "k" && rightY > 0) {
    rightY -= 10;
  }
  if (key === "m" && rightY < HEIGHT - BARSIZE) {
    rightY += 10;
  }
});
