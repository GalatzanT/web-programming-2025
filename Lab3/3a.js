const ROWS = 4;
const COLS = 4;
let firstClick = null;
let secondClick = null;
let locked = false;

const table = document.getElementById("tabelJoc");
const mesajFinal = document.getElementById("mesajFinal");

// Creăm perechi de imagini
let imagini = [];
for (let i = 1; i <= (ROWS * COLS) / 2; i++) {
  imagini.push(`img${i}.jpg`);
  imagini.push(`img${i}.jpg`);
}

// Le amestecăm (Fisher-Yates shuffle)
for (let i = imagini.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [imagini[i], imagini[j]] = [imagini[j], imagini[i]];
}

// Construim tabelul
let index = 0;
for (let r = 0; r < ROWS; r++) {
  let row = document.createElement("tr");
  for (let c = 0; c < COLS; c++) {
    let cell = document.createElement("td");

    const img = document.createElement("img");
    img.src = "back.jpg"; // imaginea de fundal inițială
    img.dataset.realSrc = imagini[index];
    img.style.width = "100%";
    img.style.height = "100%";

    cell.appendChild(img);
    cell.addEventListener("click", clickCell);
    row.appendChild(cell);
    index++;
  }
  table.appendChild(row);
}

function clickCell() {
  if (locked) return;

  const img = this.querySelector("img");
  if (img.classList.contains("revealed")) return;

  img.src = img.dataset.realSrc;
  img.classList.add("revealed");

  if (!firstClick) {
    firstClick = img;
  } else {
    secondClick = img;
    locked = true;

    if (firstClick.dataset.realSrc === secondClick.dataset.realSrc) {
      // Se potrivesc – le lăsăm afișate
      firstClick = null;
      secondClick = null;
      locked = false;
      verificaFinal();
    } else {
      // Nu se potrivesc – le ascundem din nou după 2 secunde
      setTimeout(() => {
        firstClick.src = "back.jpg";
        secondClick.src = "back.jpg";
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
  const toateImaginile = document.querySelectorAll("img");
  const toateDescoperite = [...toateImaginile].every(img =>
    img.classList.contains("revealed")
  );
  if (toateDescoperite) {
    mesajFinal.textContent = "🎉 Felicitări! Ai găsit toate perechile!";
  }
}
