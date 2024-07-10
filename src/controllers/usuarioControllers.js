const db = require('../database/models');
//const bcrypt = require("bcryptjs");
//const Op = require('sequelize');

const usuarioControllers = {
    login: function (req, res) {
        res.render("usuario/login");
        
    },
    cuentaUsuario:  (req, res)=> {
        console.log(req.body);
        db.Usuarios.findAll({
            where:{
                dni:req.body.username,
                contrasenia:req.body.password
            },
            include:['rol']
        })
        .then((usuarios)=>{
            console.log(usuarios)
            if (usuarios.length > 0) {
               
                switch (usuarios[0].rol.idRol) {
                    case 1:
                        res.render('usuario/admin/administrador', { usuarios });
                        break;
                    case 2:
                        res.render('usuario/alumno', { usuarios });
                        break;
                    default:
                        res.render('usuario/login', { error: 'Rol no reconocido' });
                        break;
                }
            }
        })
        .catch((error) => {
            console.error(error);
            res.render('usuario/login', { error: 'Error en el servidor' });
        });
    },
    registroPublicaciones: function (req, res) {
        res.render("usuario/admin/publicacion", { publicaciones: [] });
    },
    registroUsuarios: function (req, res) { // Asegúrate de que esta función está correctamente definida
        // Aquí puedes agregar la lógica para obtener la lista de usuarios, si es necesario
        res.render("usuario/admin/registroUsuarios", { usuarios: [] });
    }
};

module.exports = usuarioControllers;




