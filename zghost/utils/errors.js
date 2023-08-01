import createHttpError from "http-errors";
import { render, status } from "./http-response.js";

export const catchErros = (req, res, next) => {
    next(createHttpError(404));
  }

export const renderErrors = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    status(res, err.status || 500);
    render(res, 'error', {title: `Error | ${err.message}`});
  }