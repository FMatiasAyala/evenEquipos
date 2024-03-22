document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el parámetro "id" de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const equipoId = urlParams.get("id");
  const marca = urlParams.get("marca")
  const modelo = urlParams.get("modelo")
  const infoEquipo = document.getElementById("info-equipo");
  const cuerpoTabla = document.getElementById("cuerpo-tabla");
  const formulario = document.getElementById("miFormulario");
  const fechaInput = document.getElementById("fechaInput");
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toISOString().split("T")[0];
  const btnContrato = document.getElementById("btnContrato");
  // Asignar la fecha formateada al input de fecha
  fechaInput.value = fechaFormateada;
 

  /* Trae info del equipo */
  const datoEquipo = document.createElement("h3")
  datoEquipo.innerHTML = `<h1>${modelo}</h1>
  <h2>${marca}</h2>
  <h3>14-02-2023</h3>
  <h3>hfsanudvg</h3>
  <h3>fdsajknfiadsnfiuadosnfa9isudnfasdifmasd</h3>
  `
  infoEquipo.appendChild(datoEquipo)


/* Ejecuta la solicitud post y la funcion para llenar tabla */
  function equipo_medico(id_equipo) {
    fetch("http://192.168.1.53:4000/evn/eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_equipo }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Realiza acciones adicionales según la respuesta del servidor
        llenarDatos(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }

  equipo_medico(equipoId);

  function limpiarTabla() {
    cuerpoTabla.innerHTML = "";
  }
  /* Funcion para llenar tabla */
  async function llenarDatos(equipos) {
    limpiarTabla();

    equipos.forEach((equipo) => {
      const fila = document.createElement("tr");
      
      // Ajusta las siguientes líneas según las propiedades reales de tus objetos  
      fila.innerHTML = `
      <td>${equipo.usuario ? equipo.usuario : '-'}</td>
      <td>${equipo.descripcion ? equipo.descripcion : '-'}</td>
      <td>${equipo.estado ? equipo.estado : '-'}</td>
      <td>${equipo.fecha_evento ? equipo.fecha_evento : '-'}</td>
      <td><a href="#" class="detalle-link" data-id="${equipo.equipo_id}">Contrato</a></td>
      <td>${equipo.num_reporte ? equipo.num_reporte : '-'}</td>
      <!-- Añade más celdas según las columnas de tu tabla -->
  `;
  

      cuerpoTabla.appendChild(fila);

    });
  }

  formulario.addEventListener("submit", function (event) {
    // Aquí puedes agregar tu lógica para agregar datos
    event.preventDefault();

    const operador = document.getElementById("operadorInput").value;
    const descripcion = document.getElementById("descripcionInput").value;
    const estado = document.getElementById("estadoInput").value;
    const numReporte = document.getElementById("numReporteInput").value;
    const fecha = fechaInput.value;
    const nuevaFila = document.createElement("tr");

    const datos = { operador,descripcion,estado, fecha, equipoId, marca, modelo, numReporte};
    // Realizar la solicitud POST
    fetch("http://192.168.1.53:4000/evn/equipoNuevo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        nuevaFila.innerHTML = `
                <td>${operador}</td>
                <td>${descripcion}</td>
                <td>${estado}</td>
                <td>${fecha}</td>
                <td>Contrato</td>
                <td>${numReporte}</td>
            `;

        cuerpoTabla.appendChild(nuevaFila);
        // Limpiar los inputs después de agregar los datos
        document.getElementById("operadorInput").value = "";
        document.getElementById("descripcionInput").value = "";

        console.log("Se han agregado datos.");
      });
  });

  // Puedes utilizar equipoId en esta vista según tus necesidades
  console.log("ID del equipo, marca y modelo :", equipoId, marca, modelo);

});
