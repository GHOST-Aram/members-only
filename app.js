import { app } from './zghost/app/init.js';
import { express } from './zghost/app/init.js';
import createHttpError from 'http-errors';
import { logger } from './zghost/app/init.js';
import { indexRouter } from './routes/index.js'
import { usersRouter } from './routes/users.js'

// view engine setup
app.set('views', 'templates');
app.set('view engine', 'ejs');

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createHttpError(404));
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

export {app}
