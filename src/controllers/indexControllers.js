const db = require("../database/models");

// Función auxiliar para obtener publicaciones, publicación fijada y categorías
const obtenerDatosPublicaciones = async (idCategoria = null) => {
  // Defino condiciones para la publicación fijada y las publicaciones normales
  const wherePinned = { esFijado: true };
  const wherePublicaciones = { esFijado: false };
  // Si se proporciona una categoría, agregarla a las condiciones
  if (idCategoria) {
    wherePinned.idCategoria = idCategoria;
    wherePublicaciones.idCategoria = idCategoria;
  }
  // Consulta para obtener la publicación fijada más reciente
  const pinnedPostQuery = db.Publicaciones.findOne({
    where: wherePinned,
    order: [['fechaPublicacion', 'DESC']]
  });
  // Consulta para obtener todas las publicaciones normales, ordenadas por fecha de publicación
  const publicacionesQuery = db.Publicaciones.findAll({
    where: wherePublicaciones,
    order: [['fechaPublicacion', 'DESC']]
  });
  // Consulta para obtener todas las categorías
  const categoriasQuery = db.Categorias.findAll();

  // Ejecutar todas las consultas en paralelo y devolver una promesa que se resuelve cuando todas las consultas se completan
  return Promise.all([pinnedPostQuery, publicacionesQuery, categoriasQuery]);
};

// Función auxiliar para manejar errores
const manejarError = (res, err, mensaje) => {
  console.error(mensaje, err);
  res.status(500).send(mensaje);
};

const indexControllers = {
  // Método para renderizar la página principal con todas las publicaciones
  renderIndex: async function (req, res) {
    try {
      const [publicacionFijada, publicaciones, categorias] = await obtenerDatosPublicaciones();
      res.render('index', { publicacionFijada, publicaciones, categorias });
    } catch (err) {
      manejarError(res, err, "Error mostrando las publicaciones o categorías.");
    }
  },

  // Método para filtrar publicaciones por categoría
  filtrarPorCategoria: async function (req, res) {
    const { idCategoria } = req.params;
    try {
      const [publicacionFijada, publicaciones, categorias] = await obtenerDatosPublicaciones(idCategoria);
      res.render('index', { publicacionFijada, publicaciones, categorias });
    } catch (err) {
      manejarError(res, err, "Error mostrando las publicaciones o categorías.");
    }
  },

  // Método para obtener una publicación por su ID
  obtenerPublicacionPorId: async function (req, res) {
    const { id } = req.params;
    try {
      const publicacion = await db.Publicaciones.findByPk(id);
      if (!publicacion) {
        return res.status(404).send('Publicación no encontrada.');
      }
      res.render('noticia/noticia', { publicacion });
    } catch (err) {
      manejarError(res, err, "Error mostrando la publicación.");
    }
  },

  pruebaSession: function (req, res) {
    if (req.session.numeroVisitas == undefined) {
      req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++;
    res.send("Session tiene el numero: " + req.session.numeroVisitas);
  },

  mostrarNumeroSession: function (req, res) {
    console.log("Llamada a la función mostrarNumeroSession");
    res.send("Session tiene el numero: " + req.session.numeroVisitas);
  }
};

module.exports = indexControllers;