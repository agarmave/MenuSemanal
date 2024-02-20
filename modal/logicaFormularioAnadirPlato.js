document.addEventListener("DOMContentLoaded", function() {
    // Referencia al formulario
    const formularioAnadirPlato = document.getElementById("formularioAnadirPlato");
  
    // Manejador del evento de envío del formulario
    formularioAnadirPlato.addEventListener("submit", function(event) {
      // Previene el envío del formulario
      event.preventDefault();
  
      // Captura los datos del formulario en un objeto FormData
      const formData = new FormData(formularioAnadirPlato);
  
      // Convierte los datos del formulario a un objeto JavaScript
      const datosReceta = {};
      formData.forEach((value, key) => {
        datosReceta[key] = value;
      });
  
      // Realiza una solicitud POST al servidor con los datos de la receta
      fetch('https://agarmave.github.io/MenuSemanal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Especifica el tipo de contenido JSON
        },
        body: JSON.stringify(datosReceta) // Convierte los datos a formato JSON
      })
      .then(response => {
        if (response.ok) {
          console.log('Receta guardada exitosamente!');
          // Aquí puedes realizar alguna acción adicional si la solicitud se realizó con éxito
        } else {
          console.error('Hubo un problema al guardar la receta.');
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
    });
  });
  