
var modalAnadirPlato = document.getElementById("modalFormularioAnadirPlato");

// Get the <span> element that closes the modal
var spanModal = document.getElementsByClassName("close")[0];


//logica para abrir el modal de Añadir Plato
function abrirModalAnadirPlato(){
    modalAnadirPlato.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanModal.onclick = function() {
    modalAnadirPlato.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalAnadirPlato) {
        modalAnadirPlato.style.display = "none";
    }
}
