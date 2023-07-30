import { app } from './zghost/app/init.js';
import { 
    catchErros, 
    renderErrors 
} from './zghost/utils/errors.js';
import { indexRouter } from './routes/index.js'
import { runConfigurations } from './zghost/app/config.js';

runConfigurations()

app.use('/', indexRouter);


//Only development
app.use(catchErros);
app.use(renderErrors);



export { app }
