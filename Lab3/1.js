function muta(idElement) {
    
    var optiune = document.getElementById(idElement);
  
    
    var listaCurenta = optiune.parentElement;
  
   
    var cealaltaLista;
    if (listaCurenta.id === "list1") {
      cealaltaLista = document.getElementById("list2");
    } else {
      cealaltaLista = document.getElementById("list1");
    }
  
    
    listaCurenta.removeChild(optiune);
    cealaltaLista.appendChild(optiune);
  }
  