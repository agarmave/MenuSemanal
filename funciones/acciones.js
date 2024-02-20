//Función drag&drop
function dragElement(event) {
    const element = event.target;
    var elementClone;

    
    element.classList.add("platoClicado");

    comprobarSiEstaEnCalendario(element,"coger");
    comprobarSiEstaEnEliminar(element,"coger");
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
      if (!comprobarSiEstaEnCalendario(element,"soltar")){
        comprobarSiEstaEnColumnasPlatos(element);
      }
      comprobarSiEstaEnEliminar(element,"soltar");
      
      document.onmousemove = null;
      document.onmouseup = null;
    }
   }
   //Fin Función drag&drop

   //funcion para ocultar/mostrar platos
   function ocultarColumnaPlatos(idDivOcultar, idFlechaOcultar, idDivFlechaMostrar){
    document.getElementById(idDivOcultar).style.display="none";
    document.getElementById(idFlechaOcultar).style.display="none";
    document.getElementById(idDivFlechaMostrar).style.display="inline-block";
   }
   function mostrarColumnaPlatos(idDivMostrar, idFlechaOcultar, idDivFlechaMostrar){
    document.getElementById(idDivMostrar).style.display="block";
    document.getElementById(idFlechaOcultar).style.display="none";
    document.getElementById(idDivFlechaMostrar).style.display="inline-block";
   }
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
 
  function mostrarBorrarPlato(){
    document.getElementById("eliminarPlato").classList.remove("oculto");
    document.getElementById("botonMostrarEliminarPlato").classList.add("oculto");
  }
  function borrarPlato(){
    //Comprobamos si hay plato
    //si hay plato 
        //borrar plato del html
        //borrar plato del json
        //borrar plato del servidor?
            //crear toquen para editar
        //ocultar borrar plato
        //mostrar boton general de borrado
    //si no hay plato mensaje de error de añade un plato
  }