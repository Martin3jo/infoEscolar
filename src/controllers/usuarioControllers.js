const db = require("../database/models");
const { validationResult } = require("express-validator");
const upload = require("../database/config/multer");

// Función auxiliar para manejar errores
const manejarError = (res, err, mensaje) => {
  console.error(mensaje, err);
  res.status(500).send(mensaje);
};

const usuarioControllers = {
  login: function (req, res) {
    res.render("usuario/login", { errors: [] });
  },

  cuentaUsuario: function (req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("usuario/login", { errors: errors.mapped(), old: req.body });
    } else {
      db.Usuarios.findOne({
        where: {
          dni: req.body.username,
          contrasenia: req.body.password,
        },
        include: [
          {
            model: db.Alumnos,
            as: "alumno",
          },
          {
            model: db.Docentes,
            as: "docente",
          },
          {
            model: db.Roles,
            as: "rol",
          },
        ],
      })
        .then((usuarios) => {
          if (!usuarios) {
            return res.render("usuario/login", {
              errors: {
                username: {
                  msg: 'Usuario inexistente en la base de datos'
                },
                password: {
                  msg: 'Contraseña incorrecta'
                }
              },
              old: req.body,
            });
          } else {
            switch (usuarios.rol.idRol) {
              case 1:
                const datosAdmin = usuarios.docente.dataValues;
                req.session.usuarioLogueado = { ...datosAdmin, idUsuario: usuarios.idUsuario, rol: usuarios.rol.idRol };
                console.log('Dato de usuario logueado:', req.session.usuarioLogueado);
                res.redirect('/usuario/perfil');
                break;
              case 2:
                const datosAlumno = usuarios.alumno.dataValues;
                req.session.usuarioLogueado = { ...datosAlumno, idUsuario: usuarios.idUsuario, rol: usuarios.rol.idRol };
                console.log('Datos del usuario logueado:', req.session.usuarioLogueado);
                res.redirect('/usuario/perfil');
                break;
              default:
                res.render("usuario/login", { error: "Rol no reconocido" });
                break;
            }
            if (req.body.recordarme) {
              res.cookie("perfil", req.body.username, { maxAge: 900000 });
            }
          }
        })
        .catch((error) => {
          manejarError(res, error, "Error en el servidor");
        });
    }
  },

  perfil: function (req, res) {
    if (!req.session.usuarioLogueado) {
      return res.redirect('/login');
    }
    const currentYear = new Date().getFullYear();

    switch (req.session.usuarioLogueado.rol) {
      case 1:
        res.render("usuario/admin/administrador", { datosAdmin: req.session.usuarioLogueado, currentYear });
        break;
      case 2:
        res.render("usuario/alumno", { datosAlumno: req.session.usuarioLogueado, currentYear });
        break;
      default:
        res.redirect('/login');
        break;
    }
  },

  logout: function (req, res) {
    req.session.destroy(() => {
      res.clearCookie('perfil');
      res.redirect('/');
    });
  },

  renderPublicaciones: async function (req, res) {
    try {
      const publicaciones = await db.Publicaciones.findAll();
      res.render("usuario/admin/publicacion", { publicaciones });
    } catch (err) {
      manejarError(res, err, "Error mostrando las publicaciones. Por favor, inténtelo de nuevo más tarde.");
    }
  },

  renderCrearEditarPublicacion: async function (req, res) {
    const postId = req.params.id; 

    try {
      const [categorias, publicacion] = await Promise.all([
        db.Categorias.findAll(),
        postId ? db.Publicaciones.findByPk(postId) : Promise.resolve(null)
      ]);
      res.render("usuario/admin/crearPublicacion", { publicacion, categorias, locals: {} });
    } catch (err) {
      manejarError(res, err, "Error obteniendo las categorías o la publicación. Por favor, inténtelo de nuevo más tarde.");
    }
  },

  crearPublicacion: function (req, res) {
    // Verifico si el usuario está autenticado y tiene el rol correcto
    if (!req.session.usuarioLogueado || !req.session.usuarioLogueado.idDocente) {
      return res.status(500).send('Error: Usuario no autenticado o idDocente no encontrado.');
    }

    const idDocente = req.session.usuarioLogueado.idDocente;

    upload(req, res, async (err) => {
      if (err) {
        manejarError(res, err, 'Error subiendo la imagen.');
      } else {
        const { titulo, contenido, categoria } = req.body;
        const imagen = req.file ? req.file.filename : 'default.png';
        if (!titulo || !contenido || !categoria) {
          return res.status(400).send('Se necesitan llenar todos los campos.');
        }
        const fechaPublicacion = new Date().toISOString().split('T')[0];

        try {
          await db.Publicaciones.create({
            titulo,
            contenido,
            imagen,
            fechaPublicacion,
            idDocente,
            idCategoria: categoria,
            esFijado: req.body.esFijado ? true : false
          });
          res.redirect('/usuario/perfil/publicacion');
        } catch (err) {
          manejarError(res, err, "Error creando la publicación.");
        }
      }
    });
  },

  editarPublicacion: function (req, res) {
    upload(req, res, async (err) => {
      if (err) {
        manejarError(res, err, 'Error subiendo la imagen.');
      } else {
        const { id } = req.params;
        const { titulo, contenido, categoria } = req.body;
        const imagen = req.file ? req.file.filename : null;

        const fechaPublicacion = new Date().toISOString().split('T')[0];
        const idDocente = req.session.usuarioLogueado.idDocente;

        try {
          await db.Publicaciones.update(
            {
              titulo,
              contenido,
              imagen: imagen ? imagen : db.Sequelize.literal('imagen'),
              fechaPublicacion,
              idDocente,
              idCategoria: categoria,
              esFijado: req.body.esFijado ? true : false
            },
            { where: { idPublicacion: id } }
          );
          res.redirect('/usuario/perfil/publicacion');
        } catch (err) {
          manejarError(res, err, "Error actualizando la publicación.");
        }
      }
    });
  },

  eliminarPublicacion: async function (req, res) {
    const { id } = req.params;

    try {
      await db.Publicaciones.destroy({
        where: { idPublicacion: id }
      });
      res.redirect('/usuario/perfil/publicacion');
    } catch (err) {
      manejarError(res, err, "Error eliminando la publicación.");
    }
  },

  fijarPublicacion: async function (req, res) {
    const { id } = req.params;

    try {
      // Verificar si la publicación ya está fijada
      const publicacion = await db.Publicaciones.findByPk(id);
      if (!publicacion) {
        return res.status(404).send('Publicación no encontrada.');
      }

      const esFijado = publicacion.esFijado;

      if (esFijado) {
        // Desfijar la publicación si ya está fijada
        await db.Publicaciones.update(
          { esFijado: false },
          { where: { idPublicacion: id } }
        );
      } else {
        // Desfijar todas las publicaciones y fijar la seleccionada
        await db.Publicaciones.update(
          { esFijado: false },
          { where: { esFijado: true } }
        );
        await db.Publicaciones.update(
          { esFijado: true },
          { where: { idPublicacion: id } }
        );
      }

      res.redirect('/usuario/perfil/publicacion');
    } catch (err) {
      manejarError(res, err, "Error fijando/desfijando la publicación.");
    }
  },

  // Método para agregar un comentario a una publicación
  agregarComentario: async function (req, res) {
    const { idPublicacion } = req.params;
    const { comentario } = req.body;
    const usuarioLogueado = req.session.usuarioLogueado;

    if (!usuarioLogueado) {
      return res.status(401).send('Usuario no autenticado.');
    }

    try {
      const idUsuario = usuarioLogueado.idUsuario; 
      const fechaComentario = new Date();

      await db.Comentarios.create({
        idPublicacion,
        idUsuario,
        fechaComentario,
        comentario
      });

      res.redirect(`/publicacion/${idPublicacion}`);
    } catch (err) {
      manejarError(res, err, "Error agregando el comentario.");
    }
  },

 //Método para que un usuario pueda borrar su propio comentario y admin pueda borrar cualquier comentario
  eliminarComentario: async function (req, res) {
    const { idComentario } = req.params;
    const usuarioLogueado = req.session.usuarioLogueado;

    console.log('Usuario Logueado:', usuarioLogueado);
    console.log('Usuario Logueado Rol:', usuarioLogueado ? usuarioLogueado.rol : 'No logueado');

    if (!usuarioLogueado) {
      return res.status(401).send('No autorizado.');
    }

    try {
      const comentario = await db.Comentarios.findOne({
        where: {
          idComentario,
          ...(usuarioLogueado.rol !== 1 && { idUsuario: usuarioLogueado.idUsuario })
        },
        include: {
          model: db.Usuarios,
          as: 'usuario'
        }
      });

      if (!comentario) {
        return res.status(404).send('Comentario no encontrado o no autorizado.');
      }

      await db.Comentarios.destroy({
        where: { idComentario }
      });

      res.redirect(`/publicacion/${comentario.idPublicacion}`);
    } catch (err) {
      manejarError(res, err, "Error eliminando el comentario.");
    }
  }
};


module.exports = usuarioControllers;