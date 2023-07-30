import createHttpError from "http-errors";

export const catchAndForward404Erros = (req, res, next) => {
    next(createHttpError(404));
  }

export const handle404Errors = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: `Error | ${err.message}`});
  }