import { app } from './zghost/app/init.js';
import { 
    catchErros, 
    renderErrors 
} from './zghost/utils/errors.js';
import { indexRouter } from './routes/index.js'
import { appConfig } from './zghost/app/config.js';

appConfig()

app.use('/', indexRouter);

app.use(catchErros);
app.use(renderErrors);



export {app}
