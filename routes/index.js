import { index } from "../club-house/views/index.js";
import { express } from "../zghost/app/init.js";

const indexRouter = express.Router();

indexRouter.get('/', index);

export { indexRouter}