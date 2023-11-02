//Función drag&drop
function dragElement(event) {
    const element = event.target;
    var elementClone;
    
    //ocultamos el plato original 
    //obtenemos las coordenadas fijas del plato original
    //buscamos el plato oculto con el mismo nombre
    //lo ponemos en la posición del plato original
    
    element.classList.add("platoClicado");

    //localizamos el div equivalente oculto
    const contenedor = document.getElementById('columnaPlatosOcultos'); // Obtén el elemento contenedor por su ID
    const textoBuscado = element.textContent; // El texto que deseas encontrar
    const divs = contenedor.getElementsByTagName('div'); // Obtén todos los elementos <div> dentro del contenedor

    for (const divBuscado of divs) {
        if (divBuscado.textContent.includes(textoBuscado)) {
            elementClone=divBuscado;
        }
    }
    //Ahora hay que ocultar el element original
    //Hay que colocar el clonado en la posición del original
    //hay que darle la clase de "clicado"
    //Y luego si el clonado está en el calendario la logica
    //Y si sale del calendario deshacer todo esto (para que vuelva a ponerse el clonado donde sea y el original se muestre)


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