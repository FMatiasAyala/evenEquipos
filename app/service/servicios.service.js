const pool = require('../config/conexionDB');

class ServiciosService {

    async servicios(data) {
        try {
            let query;

            if (data && data.trim() !== '') {
                query = `
                    SELECT * 
                    FROM tbl_equipos 
                    WHERE servicio LIKE '${data.trim()}%' OR modelo LIKE '${data.trim()}%'
                `;
            } else {
                query = `
                    SELECT * 
                    FROM tbl_equipos
                `;
            }

            const servicios = await new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error('Error en la conexión a la base de datos:', err);
                        reject(err);
                        return;
                    }

                    connection.query(query, (error, results) => {
                        connection.release();
                        if (error) {
                            console.error('Error en la consulta:', error);
                            reject(error);
                            return;
                        }
                        resolve(results);
                    });
                });
            });

            return servicios;
        } catch (error) {
            console.error('Error en el método servicios:', error);
            throw error; // Puedes manejar el error de otra manera según tus necesidades
        }
    }

}

module.exports = ServiciosService;
