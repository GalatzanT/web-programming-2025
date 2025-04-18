function valideazaFormular() {
    let nume = document.getElementById("nume");
    let dataNastere = document.getElementById("dataNastere");
    let varsta = document.getElementById("varsta");
    let email = document.getElementById("email");
    let mesaj = document.getElementById("mesaj");

    let campuriInvalide = [];

    
    [nume, dataNastere, varsta, email].forEach(input => {
        input.classList.remove("eroare");
    });

   
    let regexLitere = /^[a-zA-ZăîâșțĂÎÂȘȚ\s\-]+$/;
    if (nume.value.trim() === "" || !regexLitere.test(nume.value)) {
        campuriInvalide.push("nume");
        nume.classList.add("eroare");
    }

    
    let data = new Date(dataNastere.value);
    let azi = new Date();
    let varstaCalculata = azi.getFullYear() - data.getFullYear();
    let luna = azi.getMonth() - data.getMonth();
    if (luna < 0 || (luna === 0 && azi.getDate() < data.getDate())) {
        varstaCalculata--;
    }

    
    let varstaVal = parseInt(varsta.value);
    if (
        isNaN(varstaVal) ||
        varsta.value.trim() === "" ||
        varstaVal < 1 ||
        varstaVal > 99 ||
        varstaVal !== varstaCalculata
    ) {
        campuriInvalide.push("varsta");
        varsta.classList.add("eroare");
    }

    // Validare email simplă
    let regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
    if (email.value.trim() === "" || !regexEmail.test(email.value)) {
        campuriInvalide.push("email");
        email.classList.add("eroare");
    }

    // Afișare mesaj
    if (campuriInvalide.length === 0) {
        mesaj.style.color = "green";
        mesaj.innerText = "Datele sunt completate corect";
    } else {
        mesaj.style.color = "red";
        mesaj.innerText = "Campurile " + campuriInvalide.join(" si ") + " nu sunt completate corect";
    }
}


