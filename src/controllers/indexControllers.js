const indexControllers = {
  index: function (req, res) {
    res.render("index");
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
