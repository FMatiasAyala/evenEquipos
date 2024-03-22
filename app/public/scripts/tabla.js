document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("miFormulario"); // Asigna el ID correcto a tu formulario
  const cuerpoTabla = document.getElementById("cuerpo-tabla");
  const todoCheckbox = document.getElementById("todoCheckbox");


    form.addEventListener("input", function (event) {
    event.preventDefault();
    const consulta = document.getElementById("consultaInput").value; // Obtén el valor de tu campo de entrada

    const buscarTodo = todoCheckbox.checked;

    // Realiza la solicitud POST al backend
    fetch("http://192.168.1.53:4000/serv/servicios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ consulta: buscarTodo ? "": consulta }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Realiza acciones adicionales según la respuesta del servidor
        llenarTabla(data);
        
      
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  });


  
  cuerpoTabla.addEventListener("click", function (event) {
    if (event.target.classList.contains("detalle-link")) {
      event.preventDefault();
      const equipoId = event.target.dataset.id;
      const marca = event.target.dataset.marca;
      const modelo = event.target.dataset.modelo;

      fetch("http://192.168.1.53:4000/serv/servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equipoId, marca, modelo }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);

          // Redirige a otra vista con los datos del equipo
          window.location.href = `http://192.168.1.53:4000/evn/eventos?id=${equipoId}&modelo=${modelo}&marca=${marca}`;

        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    }
  });
  function limpiarTabla() {
    cuerpoTabla.innerHTML = "";
  }

  async function llenarTabla(equipos) {
    limpiarTabla();
    equipos.forEach((equipo) => {
      const fila = document.createElement("tr");
      // Ajusta las siguientes líneas según las propiedades reales de tus objetos
      fila.innerHTML = `
            <td id='${equipo.equipo_id}'>${equipo.servicio}</td>
            <td>${equipo.marca}</td>
            <td>${equipo.modelo}</td>
            <td>${equipo.ubicacion}</td>
            <td><button class="contrato-button"></button></td>
            <td><a href="#" class="detalle-link" data-id="${equipo.equipo_id}" data-marca="${equipo.marca}" data-modelo="${equipo.modelo}">Detalle</a></td>

            <!-- Añade más celdas según las columnas de tu tabla -->
        `;
      cuerpoTabla.appendChild(fila);
    });
  }


});
