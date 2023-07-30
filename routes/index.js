import express from "express";

const indexRouter = express.Router();

indexRouter.get('/',(req, res, next) =>{
  res.render('club-house/index', { title: 'Express' });
});

export { indexRouter}