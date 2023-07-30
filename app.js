import { app } from './zghost/app/init.js';
import { 
    catchAndForward404Erros, 
    handle404Errors 
} from './zghost/utils/errors.js';
import { indexRouter } from './routes/index.js'
import { appConfig } from './zghost/app/config.js';

appConfig()

app.use('/', indexRouter);

app.use(catchAndForward404Erros);
app.use(handle404Errors);



export {app}
