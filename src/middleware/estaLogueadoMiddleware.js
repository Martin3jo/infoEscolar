

function userLoggedMiddleware(req, res, next) {
    res.locals.usuarioLogueado = req.session.usuarioLogueado || null;
    next();
  }
  
  module.exports = userLoggedMiddleware;
  