const pool = require('../config/conexionDB');
const moment = require('moment');


class EventosService {
    async eventos(data) {
        try {
            let query;
            const equipoId = parseInt(data)
            if (data !== '') {;
                query = `
                    SELECT a.servicio as servicio, a.marca as marca, a.modelo as modelo, b.descripcion as descripcion, b.fecha_evento as fecha_evento, b.usuario as usuario, b.num_reporte as num_reporte 
                    FROM tbl_equipos a 
                    INNER JOIN tbl_eventos b ON a.equipo_id = b.equipo_id 
                    WHERE a.equipo_id = ${equipoId}
                `;
            } else {
                console.log('No tiene nada');
            }            
        // Ejecutar la consulta SQL utilizando el método query del pool
        const eventos = await new Promise((resolve, reject) => {
            pool.query(query, [equipoId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });

        // Devolver los resultados de la consulta
        return eventos;
        } catch (error) {
            console.error('Error en el método eventos:', error);
            throw error;
        }
    }

    async agregarEquipo(operador, descripcion, estado, fecha_evento, id_equipo, marca, modelo, num_reporte) {
        try {
            const query = `
                INSERT INTO tbl_eventos (usuario, descripcion, fecha_evento, estado, equipo_id, marca, modelo, num_reporte) 
                VALUES ('${operador}', '${descripcion}', '${fecha_evento}', '${estado}', '${id_equipo}', '${marca}', '${modelo}', '${num_reporte}')
            `;

            const resultado = await new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error('Error en la conexión a la base de datos:', err);
                        reject(err);
                        return;
                    }

                    connection.query(query, (error, results) => {
                        connection.release();
                        if (error) {
                            console.error('Error al agregar equipo:', error);
                            reject(error);
                            return;
                        }
                        resolve(results);
                    });
                });
            });

            console.log(resultado);
            return resultado;
        } catch (error) {
            console.error('Error al agregar equipo:', error);
            throw error;
        }
    }
}

module.exports = EventosService;
