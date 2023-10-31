//Aquí van los platos
var platosJSON = {
  "platos": [
    {
      "nombre": "Perrito caliente",
      "ingredientes": ["pan de perrito", "salsa mostaza&miel Mercadona", "beacon grueso", "salchichas baviera/ibericas", "queso curado en lonchas", "cebolla frita"]
    },
    {
      "nombre": "Alitas de pollo",
      "ingredientes": ["alitas de pollo", "pimientos", "cebolla", "tomate frito", "tomate troceado"]
    },
    {
      "nombre": "Ensalada César",
      "ingredientes": ["lechuga", "pavo", "picatostes", "queso parmesano", "salsa César"]
    },
    {
      "nombre": "Sandwitch mixto",
      "ingredientes": ["lechuga", "beacon grueso", "queso en lonchas", "cebolla frita", "salsa César", "huevos"]
    },
    {
      "nombre": "Pastrami",
      "ingredientes": ["lechuga", "pastrami", "queso en lonchas", "cebolla frita", "salsa César"]
    },
    {
      "nombre": "Pasta tomate",
      "ingredientes": ["salchichas baviera/ibericas", "tomate frito", "queso rallado", "zanahoria", "cebolla"]
    },
    {
      "nombre": "Pasta nata",
      "ingredientes": ["nata", "jamon york", "queso rallado", "zanahoria", "cebolla", "huevos"]
    },
    {
      "nombre": "Nachos",
      "ingredientes": ["pimientos", "cebolla", "queso rallado", "tomate frito", "doritos queso"]
    },
    {
      "nombre": "Coliflor",
      "ingredientes": ["coliflor"]
    },
    {
      "nombre": "Costillas",
      "ingredientes": ["costillas cerdo"]
    },
    {
      "nombre": "Chop Suei",
      "ingredientes": ["pollo", "cebolla", "pimientos", "salsa agridulce", "piña lata", "setas"]
    },
    {
      "nombre": "Berenjenas miel",
      "ingredientes": ["berenjena", "harina tempura"]
    },
    {
      "nombre": "Pollo curry",
      "ingredientes": ["pollo", "pimientos", "cebolla", "zanahoria", "setas", "tomate frito"]
    },
    {
      "nombre": "Raviolis calabaza",
      "ingredientes": ["raviolis calabaza", "nata", "setas", "queso parmesano rallado"]
    },
    {
      "nombre": "Pulpo horno",
      "ingredientes": ["pulpo cocido", "patatas"]
    },
    {
      "nombre": "Tosta gulas",
      "ingredientes": ["gulas"]
    },
    {
      "nombre": "Lacon con queso",
      "ingredientes": ["lacón", "queso tetilla"]
    },
    {
      "nombre": "Pizza casera",
      "ingredientes": ["masa pizza Mercadona", "tomate frito", "mozzarella", "pollo desmigado", "beacon tacos", "jamon york", "nata", "tomates", "queso rallado", "mozzarella rallada"]
    },
    {
      "nombre": "Ensal Capresse",
      "ingredientes": ["mozzarella", "albahaca fresca", "tomate"]
    },
    {
      "nombre": "Pollo Asado",
      "ingredientes": ["pollo preparado Mercadona / Coquellet"]
    },
    {
      "nombre": "Filetes Costco",
      "ingredientes": ["filetes Costco"]
    },
    {
      "nombre": "Presa ibérica",
      "ingredientes": ["presa iberica", "patatas baby"]
    },
    {
      "nombre": "Pat. FosterHollywood",
      "ingredientes": ["patatas", "beacon tacos", "queso rallado", "yogurt griego", "cebollino", "limon"]
    },
    {
      "nombre": "Durum casero",
      "ingredientes": ["durum mercadona", "tortitas maiz", "queso rallado", "lechuga", "tomate", "queso feta", "cebolla"]
    },
    {
      "nombre": "Fajitas",
      "ingredientes": ["pollo", "sazonador fajitas Mercadona", "pimientos", "cebolla", "queso rallado"]
    }
  ]
};
// Objeto para realizar un seguimiento de platos e ingredientes
var listaPlatos = {};

document.addEventListener("DOMContentLoaded", function() {
	// leemos el json
	platosJSON.platos.forEach(plato => {
		console.log(plato);
		const contenedorPlatos = document.getElementById('columnaPlatos');
		const platoDiv = document.createElement('div');
	      platoDiv.className = 'plato';
	      platoDiv.addEventListener('mousedown', function(event) {  dragElement(event);});
	      platoDiv.textContent = plato.nombre;

	      contenedorPlatos.appendChild(platoDiv);
		});
});

//Función drag&drop
function dragElement(event) {
  const element = event.target;
  element.classList.add("platoClicado");
  comprobarSiEstaEnCalendario(element,"coger");
  const offsetX = event.clientX - element.getBoundingClientRect().left;
  const offsetY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  //element.style.left = event.clientX - offsetX - document.getElementById("columnaPlatos").offsetWidth + 'px';
  element.style.zIndex = 1000;

  document.onmousemove = moveElement;
  document.onmouseup = stopMoving;

  function moveElement(e) {
    //element.style.left = e.clientX - offsetX - document.getElementById("columnaPlatos").offsetWidth + 'px';
    element.style.left = e.clientX - offsetX + 'px';
    element.style.top = e.clientY - offsetY + 'px';
  }

  function stopMoving() {
  	element.classList.remove("platoClicado");
    comprobarSiEstaEnCalendario(element,"soltar");
    document.onmousemove = null;
    document.onmouseup = null;
  }
 }
 //Fin Función drag&drop

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

//Función para obtener los ingredientes 
function buscarIngredientesPorNombre(nombrePlato) {
  for (var i = 0; i < platosJSON.platos.length; i++) {
    if (platosJSON.platos[i].nombre === nombrePlato) {
      return platosJSON.platos[i].ingredientes;
    }
  }
  return null; // Retorna null si no se encuentra el plato
}
// FIN Función para obtener los ingredientes
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
// Función para buscar ingredientes por nombre
function buscarIngredientesPorNombre(nombrePlato) {
  for (var i = 0; i < platosJSON.platos.length; i++) {
    if (platosJSON.platos[i].nombre === nombrePlato) {
      return platosJSON.platos[i].ingredientes;
    }
  }
  return null; // Retorna null si no se encuentra el plato
}
//FIN Función para buscar ingredientes por nombre