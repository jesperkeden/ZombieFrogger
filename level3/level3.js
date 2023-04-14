const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const zombiesLeft = document.querySelectorAll(".zombie-left");
const zombiesRight = document.querySelectorAll(".zombie-right");
const batsUp = document.querySelectorAll(".bat-up");
const restartButton = document.querySelector("#restart-button");
const wizardsRight = document.querySelectorAll(".wizard-right");

let currentIndex = 76;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 40;

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
  batsUp.forEach((batUp) => moveBatUp(batUp));
  wizardsRight.forEach((wizardRight) => moveWizardRight(wizardRight));
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

function moveBatUp(batUp) {
  switch (true) {
    case batUp.classList.contains("bat1"):
      batUp.classList.remove("bat1");
      batUp.classList.add("bat4");
      break;
    case batUp.classList.contains("bat2"):
      batUp.classList.remove("bat2");
      batUp.classList.add("bat1");
      break;
    case batUp.classList.contains("bat3"):
      batUp.classList.remove("bat3");
      batUp.classList.add("bat2");
      break;
    case batUp.classList.contains("bat4"):
      batUp.classList.remove("bat4");
      batUp.classList.add("bat3");
      break;
  }
}

function moveWizardRight(wizardRight) {
  switch (true) {
    case wizardRight.classList.contains("w1"):
      wizardRight.classList.remove("w1");
      wizardRight.classList.add("w4");
      break;
    case wizardRight.classList.contains("w2"):
      wizardRight.classList.remove("w2");
      wizardRight.classList.add("w1");
      break;
    case wizardRight.classList.contains("w3"):
      wizardRight.classList.remove("w3");
      wizardRight.classList.add("w2");
      break;
    case wizardRight.classList.contains("w4"):
      wizardRight.classList.remove("w4");
      wizardRight.classList.add("w3");
      break;
  }
}

function lose() {
  if (
    squares[currentIndex].classList.contains("bat1") ||
    squares[currentIndex].classList.contains("bat2") ||
    squares[currentIndex].classList.contains("z1") ||
    squares[currentIndex].classList.contains("z2") ||
    squares[currentIndex].classList.contains("z3") ||
    squares[currentIndex].classList.contains("w1") ||
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
