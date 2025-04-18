const ROWS = 4; 
const COLS = 4;
let firstClick = null;
let secondClick = null;
let locked = false;

const table = document.getElementById("tabelJoc");
const mesajFinal = document.getElementById("mesajFinal");


let numbers = [];
for (let i = 1; i <= (ROWS * COLS) / 2; i++) {
  numbers.push(i);
  numbers.push(i);
}

// Le amestecăm (Fisher-Yates shuffle)
for (let i = numbers.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
}

// Construim tabelul
let index = 0;
for (let r = 0; r < ROWS; r++) {
  let row = document.createElement("tr");
  for (let c = 0; c < COLS; c++) {
    let cell = document.createElement("td");
    cell.dataset.value = numbers[index];
    cell.addEventListener("click", clickCell);
    row.appendChild(cell);
    index++;
  }
  table.appendChild(row);
}

function clickCell() {
  if (locked || this.classList.contains("revealed")) return;

  this.textContent = this.dataset.value;
  this.classList.add("revealed");

  if (!firstClick) {
    firstClick = this;
  } else {
    secondClick = this;
    locked = true;

    if (firstClick.dataset.value === secondClick.dataset.value) {
      // Sunt egale – păstrăm
      firstClick = null;
      secondClick = null;
      locked = false;
      verificaFinal();
    } else {
      // Nu sunt egale – ascundem după 2 secunde
      setTimeout(() => {
        firstClick.textContent = "";
        secondClick.textContent = "";
        firstClick.classList.remove("revealed");
        secondClick.classList.remove("revealed");
        firstClick = null;
        secondClick = null;
        locked = false;
      }, 2000);
    }
  }
}

function verificaFinal() {
  const toateCelulele = document.querySelectorAll("td");
  const toateDescoperite = [...toateCelulele].every(cell =>
    cell.classList.contains("revealed")
  );
  if (toateDescoperite) {
    mesajFinal.textContent = "🎉 Felicitări! Ai găsit toate perechile!";
  }
}
