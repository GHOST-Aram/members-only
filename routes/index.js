import { express } from "../zghost/app/init.js";

const indexRouter = express.Router();

indexRouter.get('/',(req, res, next) =>{
  res.render('club-house/index', { title: 'Express' });
});

export { indexRouter}