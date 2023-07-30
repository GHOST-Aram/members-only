import { app } from './zghost/app/init.js';
import { express } from './zghost/app/init.js';
import { catchAndForward404Erros, handle404Errors } from './zghost/utils/errors.js';
import { logger } from './zghost/app/init.js';
import { indexRouter } from './routes/index.js'
import { usersRouter } from './routes/users.js'

// view engine setup
app.set('views', 'templates');
app.set('view engine', 'ejs');

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(catchAndForward404Erros);
app.use(handle404Errors);



export {app}
