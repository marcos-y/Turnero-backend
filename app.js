var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const turnosRoutes = require('./src/routes/turnoRoutes');
const tipoTurnoRoutes = require('./src/routes/tipoTurnoRoutes');
const boxesRoutes = require('./src/routes/boxesRoutes');
const cajerosRoutes = require('./src/routes/cajerosRoutes');
const tiposUsuariosRoutes = require('./src/routes/tiposUsuariosRoutes');
const facturasRoutes = require('./src/routes/facturasRoutes');
const authRoutes = require('./src/routes/authRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/api/turnos", turnosRoutes);
app.use("/api/tipos-turno", tipoTurnoRoutes);
app.use("/api/boxes", boxesRoutes);
app.use("/api/cajeros", cajerosRoutes);
app.use("/api/tipos-usuarios", tiposUsuariosRoutes);
app.use("/api/facturas", facturasRoutes);
app.use("/api/auth", authRoutes);

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

module.exports = app;
