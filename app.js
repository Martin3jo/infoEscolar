/*EXPRESS/PATH/EJS*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv= require('dotenv');
var bodyParser = require('body-parser');
const app = express();
const userLoggedMiddleware = require('./src/middleware/estaLogueadoMiddleware');

//Necesario para APIs
const cors = require('cors')
app.use(cors());

//SESSION de USUARIO
const session = require('express-session')
app.use(session({
  secret: 'Proyecto de mi autoria',
  //POR LO VISTO ESTAN DEPRECADOS
  resave: false,
  saveUninitialized: false
}));

//COOKIES
// const cookies = require('cookie-parser')
// app.use(cookies())

/*LLAMADO AL EJS*/
app.set("view engine", "ejs");  
app.set('views',path.join(__dirname,'src/views'));

/*STATICS*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const carpetaPublic = path.resolve(__dirname, "public");
app.use(express.static(path.join(carpetaPublic)));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(userLoggedMiddleware);

/*MEJORA A LOS VERBOS HTTP: PUT - DELETE*/
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));





/*ROUTES*/
const rutasIndex = require("./src/routes/index.routes");
 const rutasUsuarios = require("./src/routes/usuario.routes");
const rutasInstituto =require ("./src/routes/instituto.routes")
// const rutasAdmin = require("./routes/admin.routes");
const rutasContacto=require('./src/routes/contacto.routes')
//APIs ROUTES
// const apiProductos = require("./routes/api/apiProductos.routes")
// const apiUsuarios = require("./routes/api/apiUsuarios.routes")
// const apiCategorias = require("./routes/api/apiCategorias.routes")

//MIDDLEWARES
// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
// app.use(userLoggedMiddleware)

// const noAdminMiddleware = require('./middlewares/noAdminMiddleware')

/*ENTRY POINTS*/
app.use("/", rutasIndex);
app.use("/usuario", rutasUsuarios);
app.use("/instituto", rutasInstituto)
app.use("/contacto", rutasContacto);
// app.use("/admin",rutasAdmin)
// app.use("/admin",noAdminMiddleware, rutasAdmin);

//APIs POINTS
// app.use("/api/productos", apiProductos)
// app.use("/api/usuarios", apiUsuarios)
// app.use("/api/categorias", apiCategorias)

/*RESPUESTA AL ERROR 404*/
// app.use((req, res, next) => {
//   res.status(404).render("404");
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

dotenv.config({path:'./src/database/config/.env'})




module.exports = app;