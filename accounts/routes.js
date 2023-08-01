import { Router } from '../zghost/app/init.js'
import { signup_get, signup_post } from './views/registration.js'

const accountsRouter = Router()

accountsRouter.get('/sign-up', signup_get)
accountsRouter.post('/sign-up', signup_post)

export { accountsRouter }