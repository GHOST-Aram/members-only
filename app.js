import { app } from './zghost/app/init.js';
import { 
    catchErros, 
    renderErrors 
} from './zghost/utils/errors.js';
import { indexRouter } from './routes/index.js'
import { runConfigurations } from './zghost/app/config.js';
import { accountsRouter } from './accounts/routes.js';

runConfigurations()

app.use('/', indexRouter);
app.use('/accounts', accountsRouter )


//Only development
app.use(catchErros);
app.use(renderErrors);



export { app }
