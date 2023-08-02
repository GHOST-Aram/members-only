import { app } from './zghost/app/init.js';
import { 
    catchErros, 
    renderErrors 
} from './zghost/utils/errors.js';
import { indexRouter } from './routes/index.js'
import { runConfigurations } from './zghost/app/config.js';
import { accountsRouter } from './accounts/routes.js';
import { clubRouter } from './club-house/routes.js';
import { adminRouter } from './admin/routes.js';
import { not_found } from './club-house/views/index.js';

runConfigurations()

app.use((req, res, next) =>{
    res.locals.user = req.user
    next()
})
app.use('/', indexRouter);
app.use('/accounts', accountsRouter )
app.use('/club-house', clubRouter)
app.use('/admin', adminRouter)
app.use(not_found)


//Only development
app.use(catchErros);
app.use(renderErrors);



export { app }
