import { express } from "../zghost/app/init.js";


const usersRouter = express.Router();

usersRouter.get('/', (req, res, next) =>{
  res.send('respond with a resource');
});

export { usersRouter }
