document.addEventListener('DOMContentLoaded', async function() {
    const selectServicio = document.querySelector('#servicio');
    const cuerpoTabla = document.getElementById('#cuerpo-tabla')

    async function llenarServicios() {
        const urlServicios = 'http://192.168.1.53:4000/serv/servicios';

        try {
            const respuesta = await fetch(urlServicios);
            const listaServicios = await respuesta.json();

            listaServicios.forEach((objeto) => {
                const option = document.createElement('option');
                option.value = objeto.servicio; // Ajusta según el atributo real de tus objetos
                option.textContent = objeto.servicio; // Ajusta según el atributo real de tus objetos
                selectServicio.appendChild(option);

                filtrarTabla();
            });
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
        }
    }

    llenarServicios();

    async function obtenerEquipos(servicioSeleccionado) {
        const urlEquipos = `http://192.168.1.53:4000/datos?servicio=${encodeURIComponent(servicioSeleccionado)}`;

        try {
            const respuesta = await fetch(urlEquipos);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
            return [];
        }
    }

    function limpiarTabla() {
        cuerpoTabla.innerHTML = '';
    }

    async function llenarTabla(equipos) {
        limpiarTabla();

        equipos.forEach((equipo) => {
            const fila = document.createElement('tr');
            // Ajusta las siguientes líneas según las propiedades reales de tus objetos
            fila.innerHTML = `
                <td>${equipo.marca}</td>
                <td>${equipo.servicio}</td>
                <td>${equipo.modelo}</td>
                <td>${equipo.ubicacion}</td>
                <td>${equipo.año_compra}</td>
                <!-- Añade más celdas según las columnas de tu tabla -->
            `;
            cuerpoTabla.appendChild(fila);
        });
    }

    function filtrarTabla() {
        const servicioSeleccionado = selectServicio.value;

        obtenerEquipos(servicioSeleccionado)
            .then((equipos) => llenarTabla(equipos))
            .catch((error) => console.error('Error al filtrar la tabla:', error));
    }

    selectServicio.addEventListener('change', filtrarTabla);

    btnContrato.addEventListener("click", function(event) {
        event.preventDefault();
        console.log(equipoId);
        // Realiza una solicitud al backend para obtener el PDF del contrato
        fetch(`http://192.168.1.53:4000/datos/contratos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ equipoId }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Crear una URL del objeto blob para el PDF
            const url = window.URL.createObjectURL(blob);
            // Abrir el PDF en una nueva ventana
            window.open(url);
        })
        .catch(error => {
            console.error("Error al obtener el contrato:", error);
        });
    });
    

});

