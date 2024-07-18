const db = require("../database/models");
const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");
//const Op = require('sequelize');

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
  registroPublicaciones: function (req, res) {
    res.render("usuario/admin/publicacion", { publicaciones: [] });
  },
  crearPublicacion: function (req, res) {
    res.render("usuario/admin/crearPublicacion", { publicaciones: [] });
  },
  registroUsuarios: function (req, res) {
    // Asegúrate de que esta función está correctamente definida
    // Aquí puedes agregar la lógica para obtener la lista de usuarios, si es necesario
    res.render("usuario/admin/registroUsuarios", { usuarios: [] });
  },
  logout: function (req, res) {
    req.session.destroy(() => {
      res.clearCookie('perfil');
      res.redirect('/');
    });
  }
};

module.exports = usuarioControllers;
