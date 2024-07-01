const conexion = require('../database/config/conexion');

const publicacionController = {
    renderCreateForm: (req, res) => {
        res.render('usuario/crearPublicacion', { publicacion: null, categorias: [], locals: {} });
    },

    createPublicacion: (req, res) => {
        const { titulo, contenido, imagen, fechaPublicacion, idDocente  } = req.body;
        const query = 'INSERT INTO publicacion (titulo, contenido, imagen, fechaPublicacion, idDocente) VALUES (?, ?, ?, ?, ?)';
        conexion.query(query, [titulo, contenido, imagen, fechaPublicacion, idDocente ], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error creando la publicación. Por favor, inténtelo de nuevo más tarde.');
            } else {
                res.redirect('/usuario/perfil/publicacion');
                
            }
        });
    },

    listPublicaciones: (req, res) => {
        const query = 'SELECT * FROM publicacion';
        conexion.query(query, (err, publicaciones) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error mostrando las publicaciones. Por favor, inténtelo de nuevo más tarde.');
            } else {
                res.render('usuario/publicacion', { publicaciones });
            }
        });
    },

    renderEditForm: (req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM publicacion WHERE idPublicacion = ?';
        conexion.query(query, [id], (err, publicaciones) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error obteniendo la publicación para editar. Por favor, inténtelo de nuevo más tarde.');
            } else {
                res.render('usuario/crearPublicacion', { publicacion: publicaciones[0], categorias: [], locals: {} });
            }
        });
    },

    updatePublicacion: (req, res) => {
        const { id } = req.params;
        const { titulo, contenido, imagen, fechaPublicacion, idDocente } = req.body;
        const query = 'UPDATE publicacion SET titulo = ?, contenido = ?, imagen = ?, fechaPublicacion = ?, idDocente = ? WHERE idPublicacion = ?';
        conexion.query(query, [titulo, contenido, imagen, fechaPublicacion, idDocente, id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error actualizando la publicación. Por favor, inténtelo de nuevo más tarde.');
            } else {
                res.redirect('/usuario/perfil/publicacion');
            }
        });
    },

    deletePublicacion: (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM publicacion WHERE idPublicacion = ?';
        conexion.query(query, [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error eliminando la publicación. Por favor, inténtelo de nuevo más tarde.');
            } else {
                res.redirect('/usuario/perfil/publicacion');
            }
        });
    }
};

module.exports = publicacionController;