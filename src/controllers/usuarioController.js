let db = require('../database/models');

const usuarioController = {
  login: (req, res) => {
    db.Alumnos.findAll()
    .then(function(alumnos){
      console.log(alumnos);
      res.render('usuario/login',{alumnos:alumnos})
    })
  },
  contacto: (req, res) => {
    res.render("usuario/contacto");
  }
  
};
module.exports = usuarioController;
