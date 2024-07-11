const db = require("../database/models");
//const bcrypt = require("bcryptjs");
//const Op = require('sequelize');

const usuarioControllers = {
  login: function (req, res) {
    res.render("usuario/login");
  },
  cuentaUsuario: (req, res) => {
    console.log(req.body);
    db.Usuarios.findAll({
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
            error: "Usuario no encontrado",
          });
        } else {
          
          if (usuarios.length > 0) {
            
            switch (usuarios[0].rol.idRol) {
              case 1:
                const datosAdmin = usuarios[0].docente.dataValues;
                console.log("Datos del admin:", datosAdmin);
                res.render("usuario/admin/administrador", { datosAdmin });
                break;
              case 2:
                const datosAlumno = usuarios[0].alumno.dataValues;
                console.log("Datos del alumno:", datosAlumno);
                res.render("usuario/alumno", { datosAlumno });
                break;
              default:
                res.render("usuario/login", { error: "Rol no reconocido" });
                break;
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
        res.render("usuario/login", { error: "Error en el servidor" });
      });
  },
  registroPublicaciones: function (req, res) {
    res.render("usuario/admin/publicacion", { publicaciones: [] });
  },
  registroUsuarios: function (req, res) {
    // Asegúrate de que esta función está correctamente definida
    // Aquí puedes agregar la lógica para obtener la lista de usuarios, si es necesario
    res.render("usuario/admin/registroUsuarios", { usuarios: [] });
  },
};

module.exports = usuarioControllers;
