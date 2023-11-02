//Función comprobar si está encima del calendario
function comprobarSiEstaEnCalendario(element,accion){
    // Obtén una referencia al elemento absoluto
    var elementoAbsoluto = element;
  
    // Obtén todos los elementos con las clases "comida" y "cena"
    var elementosComida = document.getElementsByClassName("comida");
    var elementosCena = document.getElementsByClassName("cena");
  
    // Función para verificar la superposición
    function seSuperpone(elemento1, elemento2) {
        var rect1 = elemento1.getBoundingClientRect();
        var rect2 = elemento2.getBoundingClientRect();
  
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }
  
    // Verifica si el elemento absoluto se superpone con algún elemento de clase "comida"
    var seSuperponeAComida = false;
  
    for (var i = 0; i < elementosComida.length; i++) {
        if (seSuperpone(elementoAbsoluto, elementosComida[i])) {
            seSuperponeAComida = true;
            break;
        }
    }
  
    // Verifica si el elemento absoluto se superpone con algún elemento de clase "cena"
    var seSuperponeACena = false;
  
    for (var j = 0; j < elementosCena.length; j++) {
        if (seSuperpone(elementoAbsoluto, elementosCena[j])) {
            seSuperponeACena = true;
            break;
        }
    }
  
    if (seSuperponeAComida ||seSuperponeACena) {
      var nombrePlatoBuscado = element.textContent;
      var ingredientesEncontrados = buscarIngredientesPorNombre(nombrePlatoBuscado);
  
      if (ingredientesEncontrados !== null) {
        if (accion=="soltar"){
          gestionarPlatoEnLista(nombrePlatoBuscado, "agregar");
        }
  
        else if (accion == "coger"){
          gestionarPlatoEnLista(nombrePlatoBuscado, "quitar");
        }
      } else {
        console.log("Plato no encontrado.");
      }
    }
  }
  //FIN Función comprobar si está encima del calendario
  // Función para agregar o quitar un plato de la lista de compra
function gestionarPlatoEnLista(plato, accion) {
    var ingredientesPlato = buscarIngredientesPorNombre(plato);
  
    if (accion === "agregar") {
      if (ingredientesPlato) {
        if (listaPlatos[plato]) {
          // Si el plato ya existe en la lista, agrega los ingredientes
          listaPlatos[plato].ingredientes = listaPlatos[plato].ingredientes.concat(ingredientesPlato);
        } else {
          // Si el plato no existe, crea una entrada en el objeto
          listaPlatos[plato] = { nombre: plato, ingredientes: ingredientesPlato };
        }
        actualizarListaCompra();
      }
    } else if (accion === "quitar") {
      if (listaPlatos[plato]) {
        // Si el plato existe, elimina los ingredientes del acumulado
        listaPlatos[plato].ingredientes = listaPlatos[plato].ingredientes.filter(ingrediente => !ingredientesPlato.includes(ingrediente));
        // Si ya no hay ingredientes, elimina el plato de la lista
        if (listaPlatos[plato].ingredientes.length === 0) {
          delete listaPlatos[plato];
        }
        actualizarListaCompra();
      }
    }
  }
  //FIN Función para agregar o quitar un plato de la lista de compra
  
// Función para actualizar la lista en el HTML
function actualizarListaCompra() {
    var listaCompra = document.getElementById("cajaListaCompra");
    listaCompra.innerHTML = ""; // Limpia la lista
  
    var ingredientesAcumulados = {};
  
    for (var plato in listaPlatos) {
      var ingredientesPlato = listaPlatos[plato].ingredientes;
      for (var i = 0; i < ingredientesPlato.length; i++) {
        var ingrediente = ingredientesPlato[i];
        if (ingredientesAcumulados[ingrediente]) {
          // Si el ingrediente ya existe, aumenta la cantidad
          ingredientesAcumulados[ingrediente]++;
        } else {
          // Si no existe, agrega el ingrediente a la lista con cantidad 1
          ingredientesAcumulados[ingrediente] = 1;
        }
      }
    }
    var elementoLista = document.createElement("ul");
    for (var ingrediente in ingredientesAcumulados) {
      var elementoListaIngrediente = document.createElement("li");
      elementoListaIngrediente.textContent = ingrediente + "  -  " + ingredientesAcumulados[ingrediente];
      elementoLista.appendChild(elementoListaIngrediente);
    }
    listaCompra.appendChild(elementoLista);
  }
  //FIN Función para actualizar la lista en el HTML