const conexion = require('../database/config/conexion');
const usuario = require('../database/model/modelUsuario');

const usuarioControllers = {
    login: function (req, res) {
        res.render("usuario/login");
    },
    cuentaUsuario: function (req, res) {
        usuario.buscarUsuario(conexion, req.body, function (err, datos) {
            if (datos.length > 0) {
                switch (datos[0].idRol) {
                    case 1:
                        res.render('usuario/administrador', { admin: 'Administrador' });
                        break;
                    case 2:
                        res.render('usuario/alumno', { admin: 'Alumno' });
                        break;
                    default:
                        break;
                }
            }
        });
    },
    registroPublicaciones: function (req, res) {
        res.render("usuario/publicacion", { publicaciones: [] });
    },
    registroUsuarios: function (req, res) { // Asegúrate de que esta función está correctamente definida
        // Aquí puedes agregar la lógica para obtener la lista de usuarios, si es necesario
        res.render("usuario/registroUsuarios", { usuarios: [] });
    }
};

module.exports = usuarioControllers;




