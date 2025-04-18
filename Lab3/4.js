let directiiSortare = {}; // reține direcția sortării pentru fiecare rând

function sorteazaColoana(th) {
  const tabel = th.closest("table");
  const toateLiniile = Array.from(tabel.rows);
  const indexRand = toateLiniile.findIndex(r => r.cells[0] === th);

  if (indexRand === -1) return;

  let directie = directiiSortare[indexRand] || "asc";

  const valori = [];
  for (let i = 1; i < toateLiniile[indexRand].cells.length; i++) {
    valori.push({
      valoare: toateLiniile[indexRand].cells[i].textContent,
      coloanaIndex: i
    });
  }

  valori.sort((a, b) => {
    let valA = isNaN(a.valoare) ? a.valoare.toLowerCase() : Number(a.valoare);
    let valB = isNaN(b.valoare) ? b.valoare.toLowerCase() : Number(b.valoare);
    if (valA < valB) return directie === "asc" ? -1 : 1;
    if (valA > valB) return directie === "asc" ? 1 : -1;
    return 0;
  });

  // Rearanjăm valorile în toate liniile după ordinea sortată
  toateLiniile.forEach((linie, i) => {
    if (i === 0) return; // sar peste header
    const celule = Array.from(linie.cells).slice(1);
    const noiValori = valori.map(v => tabel.rows[i].cells[v.coloanaIndex].textContent);
    for (let j = 0; j < celule.length; j++) {
      celule[j].textContent = noiValori[j];
    }
  });

  directiiSortare[indexRand] = directie === "asc" ? "desc" : "asc";
}
