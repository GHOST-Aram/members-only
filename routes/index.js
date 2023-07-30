import { express } from "../zghost/app/init.js";
import { render } from "../zghost/utils/http-response.js";

const indexRouter = express.Router();

indexRouter.get('/',(req, res, next) =>{
  render(res, 'club-house/index', { title: 'Express' });
});

export { indexRouter}