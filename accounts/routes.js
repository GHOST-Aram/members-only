import { Router } from '../zghost/app/init.js'
import { sign_up_get } from './views.js'

const accountsRouter = Router()

accountsRouter.get('/sign-up', sign_up_get)

export { accountsRouter }