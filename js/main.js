const boxes = Array.from(document.querySelectorAll(".row .col-3"));
let randomArr = generateArrayOfRandoms();
let randomBoxes = randomArr.map((el) => boxes[el]);
const newGame = document.querySelector(".controls");
const newGameBtn = document.querySelector(".controls span");
const duration = 1000;

newGameBtn.addEventListener("click", () => {
  const nameSpan = document.querySelector(".welcome span");
  let yourName = prompt("Whats your name: ");
  yourName === null || yourName === ""
    ? (nameSpan.innerHTML = "Guest")
    : (nameSpan.innerHTML = yourName);
  newGame.classList.remove("d-flex");
  newGame.classList.add("d-none");
  startGame();
});

const newBoxes = document.querySelectorAll(".row .col-3 .box");
newBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.add("flip");
    checker();
  });
});

function checker() {
  let flippedBoxes = document.querySelectorAll(".row .col-3 .box.flip");
  let flippedBoxesCount = flippedBoxes.length;
  if (flippedBoxesCount === 2) {
    stopClicking();
    if (
      flippedBoxes[0].getAttribute("data-tech") ===
      flippedBoxes[1].getAttribute("data-tech")
    ) {
      flippedBoxes[0].classList.add("guessed");
      flippedBoxes[1].classList.add("guessed");
      flippedBoxes[0].classList.remove("flip");
      flippedBoxes[1].classList.remove("flip");
      document.getElementById("success").play();
    } else {
      setTimeout(() => {
        flippedBoxes[0].classList.remove("flip");
        flippedBoxes[1].classList.remove("flip");
      }, duration);
      document.getElementById("failed").play();
      const wrongTriesCount = document.querySelector(".wrong-tries span");
      wrongTriesCount.innerHTML = +wrongTriesCount.innerHTML + 1;
    }
  }
  let gussedBoxes = document.querySelectorAll(".row .col-3 .box.guessed");
  if (gussedBoxes.length === 20) {
    setTimeout(() => {
      window.alert("Congradulations");
      window.location.reload();
    });
  }
}

function stopClicking() {
  const gameContainer = document.querySelector(".row");
  gameContainer.classList.add("no-clicking");
  setTimeout(() => {
    gameContainer.classList.remove("no-clicking");
  }, duration);
}

function startGame() {
  const boxes = document.querySelectorAll(".row .col-3");
  const row = document.querySelector(".row");
  for (let box of boxes) {
    box.remove();
  }
  for (let bx of randomBoxes) {
    row.append(bx);
  }
}

function generateArrayOfRandoms() {
  let arr = [];
  while (arr.length < 20) {
    let randomNum = Math.ceil(Math.random() * 20) - 1;
    if (!arr.includes(randomNum)) {
      arr.push(randomNum);
    }
  }
  return arr;
}
