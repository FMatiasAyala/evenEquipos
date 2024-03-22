const { pool } = require("../config/conexionDB");

class DatosService {
  async consulta(data) {
    console.log(data);

    const { parametro1, parametro2 } = data;

    console.log(parametro1);
    console.log(parametro2);

/*     let servicio; */
    let query = `
        select * from tbl_equipos 
    `;

    if (parametro1 !== "TODOS") {
/*       servicio = parametro1; */
      query += `where servicio = '${parametro1}'`;
    }

    return new Promise((resolve, reject) => {
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
  }
  
  async contratos(equipoId) {
    console.log("No llega", equipoId);
    const ctr = equipoId;
  
    const query = `
      select arch_contrato from tbl_contratos 
      where equipo_id = '${ctr}'
    `;
  
    return new Promise((resolve, reject) => {
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
  }
}

module.exports = DatosService;
