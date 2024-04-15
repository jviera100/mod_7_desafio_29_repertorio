import pool from "../config/dbPool.js"; // Importamos la conexión a la base de datos PostgreSQL

// Función asíncrona para registrar una nueva data en la base de datos
export const registrarData = async (req, res) => {
  const { titulo, artista, tono } = req.body;
  try {
    const queryObjAdd = {
      text: 'insert into canciones (titulo, artista, tono) values ($1,$2,$3) returning *',
      values: [titulo, artista, tono]
    };
    console.log(queryObjAdd);
    const result = await pool.query(queryObjAdd);
    console.log('registrado exitosamente.');
    res.json(result.rows);

  } catch (error) {

    console.error('Error al registrar data:', error.stack);

    throw error;
  }
};


// Función asíncrona para obtener por consola el registro de una data por filtro
export const obtenerDataPorFiltro = async (req, res) => {
  const { id } = req.params;
  try {
    const queryObjGetFilter = {
      text: 'SELECT * FROM canciones WHERE id = $1',
      values: [id]
    };
    const result = await pool.query(queryObjGetFilter);
    console.log(result.rows);
    console.log("Encontrado");
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener data por filtro:', error.stack);
    throw error;
  }
}

// Función asíncrona para obtener por consola toda la data registrada
export const obtenerData = async (req, res) => {
  try {
    const queryObjGets = {
      text: 'SELECT * FROM canciones'
    };
    const result = await pool.query(queryObjGets);
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener data:', error.stack);
    throw error;
  }
}

// Función asíncrona para actualizar la data en la base de datos
export const actualizarData = async (req, res) => {
  const { titulo, artista, tono } = req.body;
  const { id } = req.params;
  try {
    const queryObjUpdate = {
      text: 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *',
      values: [titulo, artista, tono, id] // Pasa todos los parámetros necesarios
    };

    const result = await pool.query(queryObjUpdate);
    if (result.rows.length > 0) {
      console.log(`Canción con ID ${id} ha sido actualizada.`);
      res.json(result.rows[0]); // Envía la canción actualizada como respuesta
    } else {
      console.log('No se encontró canción con el ID proporcionado para actualizar.');
      res.status(404).send('Canción no encontrada'); // Envía una respuesta de error
    }
  } catch (error) {
    console.error('Error al actualizar la canción:', error.stack);
    res.status(500).send('Error al actualizar la canción'); // Envía una respuesta de error
  }
};

// Función asíncrona para eliminar la data de la base de datos
export const eliminarData = async (req, res) => {
  const { id } = req.params;
  try {
    const queryObjDelete = {
      text: 'DELETE FROM canciones WHERE id = $1',
      values: [id]
    };
    const result = await pool.query(queryObjDelete);
    //Delete requiere validación
    // if (result.rows.length > 0) {
    //     console.log(`Registros de canciones con titulo ${titulo} ha sido eliminado.`);
    //     console.log(result.rows);
    // } else {
    //     console.log('No se encontró una cancion con el titulo proporcionado para eliminar.');
    //     console.log(result.rows);
    // }
    res.json(result.rows);
  } catch (error) {
    console.error('Error al eliminar la cancion:', error.stack);
    throw error;
  }
}
