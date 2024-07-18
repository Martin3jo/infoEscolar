function guestMiddleware(req, res, next) {
  if (req.session.usuarioLogueado) {
    res.redirect("/usuario/perfil");
  } else {
    next();
  }
}
module.exports = guestMiddleware;
