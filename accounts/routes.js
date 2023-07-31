import { Router } from '../zghost/app/init.js'
import { display_signup_form, register_user } from './views.js'

const accountsRouter = Router()

accountsRouter.get('/sign-up', display_signup_form)
accountsRouter.post('/sign-up', register_user)

export { accountsRouter }