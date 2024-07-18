function recordameMiddleware(req, res,next) {
    next();
    if(req.cookies.recordame !=undefined && req.session.usuarioLogueado == undefined){
        
    } 
}
module.exports=recordameMiddleware;