
// Objeto para realizar un seguimiento de platos e ingredientes
var listaPlatos = {};
var platosJSON = {};

//Funcion actualizar json
function actualizarJson(){
  fetch("https://agarmave.github.io/MenuSemanal/platos.json")
  .then(response => response.json())
  .then(data => {
    platosJSON = data;
    pintarPlatos(platosJSON); //Ahora mismo repinta los platos cada vez que se actualiza el json. Luego habrá que sacarlo
  })
  .catch(error => {
    console.error('Error al leer el json:', error);
  });  
}
//Funcion pintar platos
function pintarPlatos(data){  
  data.platos.forEach(plato => {  
    const contenedorPlatos = document.getElementById('columnaPlatos');
    const contenedorPlatosCena = document.getElementById('columnaPlatosCenas');
    const contenedorPlatosOculto = document.getElementById('columnaPlatosOcultos');
    const platoDiv = document.createElement('div');
        platoDiv.className = 'plato';
        platoDiv.addEventListener('mousedown', function(event) {  dragElement(event);});
        platoDiv.textContent = plato.nombre;

        if (plato.horario =="comida"){
          contenedorPlatos.appendChild(platoDiv);
        }
        else if(plato.horario=="cena"){
          contenedorPlatosCena.appendChild(platoDiv);
        }
    const platoDivOcutlo = document.createElement('div');
    platoDivOcutlo.className = 'plato oculto';
    //platoDivOculto.classList.add('oculto');
    platoDivOcutlo.textContent = plato.nombre;
        contenedorPlatosOculto.appendChild(platoDivOcutlo);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  actualizarJson();
});


//Función para obtener los ingredientes 
function buscarIngredientesPorNombre(nombrePlato) {
  debugger;
  for (var i = 0; i < platosJSON.platos.length; i++) {
    if (platosJSON.platos[i].nombre === nombrePlato) {
      return platosJSON.platos[i].ingredientes;
    }
  }
  return null; // Retorna null si no se encuentra el plato
}
// FIN Función para obtener los ingredientes

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