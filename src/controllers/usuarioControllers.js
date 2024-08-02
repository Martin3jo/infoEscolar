const db = require("../database/models");
const { validationResult } = require("express-validator");
const upload = require("../database/config/multer");

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
                req.session.usuarioLogueado = { ...datosAdmin, rol: usuarios.rol.idRol};
                
                res.redirect('/usuario/perfil');
                break;
              case 2:
                const datosAlumno = usuarios.alumno.dataValues;
                req.session.usuarioLogueado = { ...datosAlumno, rol: usuarios.rol.idRol };
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
          console.error(error);
          res.render("usuario/login", { error: "Error en el servidor" });
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

  renderPublicaciones: function (req, res) {
    db.Publicaciones.findAll()
      .then((publicaciones) => {
        res.render("usuario/admin/publicacion", { publicaciones });
      })
      .catch((err) => {
        console.error("Error fetching publicaciones:", err);
        res.status(500).send("Error mostrando las publicaciones. Por favor, inténtelo de nuevo más tarde.");
      });
  },

  renderCrearEditarPublicacion: function (req, res) {
    const postId = req.params.id; // Assuming the post ID is passed as a URL parameter

    const fetchCategories = db.Categorias.findAll();
    const fetchPost = postId ? db.Publicaciones.findByPk(postId) : Promise.resolve(null);

    Promise.all([fetchCategories, fetchPost])
      .then(([categorias, publicacion]) => {
        res.render("usuario/admin/crearPublicacion", { publicacion, categorias, locals: {} });
      })
      .catch((err) => {
        console.error("Error obteniendo las categorías o la publicación:", err);
        res.status(500).send("Error obteniendo las categorías o la publicación. Por favor, inténtelo de nuevo más tarde.");
      });
  },

  crearPublicacion: function (req, res) {
    // Verificar si el usuario esta autenticado y tiene el rol correcto
    if (!req.session.usuarioLogueado || !req.session.usuarioLogueado.idDocente) {
      return res.status(500).send('Error: Usuario no autenticado o idDocente no encontrado.');
    }

    const idDocente = req.session.usuarioLogueado.idDocente;

    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error subiendo la imagen. Por favor, inténtelo de nuevo más tarde.');
      } else {
        const { titulo, contenido, categoria } = req.body;
        const imagen = req.file ? req.file.filename : 'default.png';
        if (!titulo || !contenido || !categoria) {
          return res.status(400).send('Se necesitan llenar todos los campos.');
        }
        const fechaPublicacion = new Date().toISOString().split('T')[0];

        db.Publicaciones.create({
          titulo,
          contenido,
          imagen,
          fechaPublicacion,
          idDocente,
          idCategoria: categoria,
          esFijado: req.body.esFijado ? true : false
        })
          .then(() => {
            res.redirect('/usuario/perfil/publicacion');
          })
          .catch((err) => {
            console.error("Error creando la publicación:", err);
            res.status(500).send("Error creando la publicación. Por favor, inténtelo de nuevo más tarde.");
          });
      }
    });
  },

  editarPublicacion: function (req, res) {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error subiendo la imagen. Por favor, inténtelo de nuevo más tarde.');
      } else {
        const { id } = req.params;
        const { titulo, contenido, categoria } = req.body;
        const imagen = req.file ? req.file.filename : null;

        const fechaPublicacion = new Date().toISOString().split('T')[0];
        const idDocente = req.session.usuarioLogueado.idDocente;

        db.Publicaciones.update(
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
        )
          .then(() => {
            res.redirect('/usuario/perfil/publicacion');
          })
          .catch((err) => {
            console.error("Error actualizando la publicación:", err);
            res.status(500).send("Error actualizando la publicación. Por favor, inténtelo de nuevo más tarde.");
          });
      }
    });
  },

  eliminarPublicacion: function (req, res) {
    const { id } = req.params;

    db.Publicaciones.destroy({
      where: { idPublicacion: id }
    })
      .then(() => {
        res.redirect('/usuario/perfil/publicacion');
      })
      .catch((err) => {
        console.error("Error eliminando la publicación:", err);
        res.status(500).send("Error eliminando la publicación. Por favor, inténtelo de nuevo más tarde.");
      });
  },

  logout: function (req, res) {
    req.session.destroy(() => {
      res.clearCookie('perfil');
      res.redirect('/');
    });
  }
};

module.exports = usuarioControllers;