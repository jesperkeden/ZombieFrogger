const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const zombiesLeft = document.querySelectorAll(".zombie-left");
const zombiesRight = document.querySelectorAll(".zombie-right");
const batsLeft = document.querySelectorAll(".bat-left");
const batsRight = document.querySelectorAll(".bat-right");
const restartButton = document.querySelector("#restart-button");
const continueButton = document.querySelector("#continue");

let currentIndex = 76;
let levelNumber = 1;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 20;

function moveHero(e) {
  squares[currentIndex].classList.remove("hero");
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case "ArrowUp":
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }

  squares[currentIndex].classList.add("hero");
}

function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  zombiesLeft.forEach((zombieLeft) => moveZombieLeft(zombieLeft));
  zombiesRight.forEach((zombieRight) => moveZombieRight(zombieRight));
  batsLeft.forEach((batLeft) => moveBatLeft(batLeft));
  batsRight.forEach((batRight) => moveBatRight(batRight));
}

function checkOutComes() {
  lose();
  win();
}

function moveZombieLeft(zombieLeft) {
  switch (true) {
    case zombieLeft.classList.contains("z1"):
      zombieLeft.classList.remove("z1");
      zombieLeft.classList.add("z2");
      break;
    case zombieLeft.classList.contains("z2"):
      zombieLeft.classList.remove("z2");
      zombieLeft.classList.add("z3");
      break;
    case zombieLeft.classList.contains("z3"):
      zombieLeft.classList.remove("z3");
      zombieLeft.classList.add("z4");
      break;
    case zombieLeft.classList.contains("z4"):
      zombieLeft.classList.remove("z4");
      zombieLeft.classList.add("z5");
      break;
    case zombieLeft.classList.contains("z5"):
      zombieLeft.classList.remove("z5");
      zombieLeft.classList.add("z1");
      break;
  }
}

function moveZombieRight(zombieRight) {
  switch (true) {
    case zombieRight.classList.contains("z1"):
      zombieRight.classList.remove("z1");
      zombieRight.classList.add("z5");
      break;
    case zombieRight.classList.contains("z2"):
      zombieRight.classList.remove("z2");
      zombieRight.classList.add("z1");
      break;
    case zombieRight.classList.contains("z3"):
      zombieRight.classList.remove("z3");
      zombieRight.classList.add("z2");
      break;
    case zombieRight.classList.contains("z4"):
      zombieRight.classList.remove("z4");
      zombieRight.classList.add("z3");
      break;
    case zombieRight.classList.contains("z5"):
      zombieRight.classList.remove("z5");
      zombieRight.classList.add("z4");
      break;
  }
}

function moveBatLeft(batLeft) {
  switch (true) {
    case batLeft.classList.contains("bat1"):
      batLeft.classList.remove("bat1");
      batLeft.classList.add("bat2");
      break;
    case batLeft.classList.contains("bat2"):
      batLeft.classList.remove("bat2");
      batLeft.classList.add("bat3");
      break;
    case batLeft.classList.contains("bat3"):
      batLeft.classList.remove("bat3");
      batLeft.classList.add("bat1");
      break;
  }
}

function moveBatRight(batRight) {
  switch (true) {
    case batRight.classList.contains("bat1"):
      batRight.classList.remove("bat1");
      batRight.classList.add("bat3");
      break;
    case batRight.classList.contains("bat2"):
      batRight.classList.remove("bat2");
      batRight.classList.add("bat1");
      break;
    case batRight.classList.contains("bat3"):
      batRight.classList.remove("bat3");
      batRight.classList.add("bat2");
      break;
  }
}

function lose() {
  if (
    squares[currentIndex].classList.contains("bat1") ||
    squares[currentIndex].classList.contains("z1") ||
    squares[currentIndex].classList.contains("z2") ||
    squares[currentIndex].classList.contains("z3") ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You lose!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("hero");
    document.removeEventListener("keyup", moveHero);
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You Win!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keyup", moveHero);
  }
}

startPauseButton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    outcomeTimerId = null;
    timerId = null;
    document.removeEventListener("keyup", moveHero);
  } else {
    timerId = setInterval(autoMoveElements, 750);
    outcomeTimerId = setInterval(checkOutComes, 50);
    document.addEventListener("keyup", moveHero);
  }
});

restartButton.addEventListener("click", () => {
  location.reload();
});
