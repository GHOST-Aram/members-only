import { Router } from '../zghost/app/init.js'
import { login_get, login_post } from './views/login.js'
import { logout } from './views/logout.js'
import { signup_get, signup_post } from './views/registration.js'

const accountsRouter = Router()

accountsRouter.get('/login', login_get)
accountsRouter.post('/login', login_post)
accountsRouter.get('/sign-up', signup_get)
accountsRouter.post('/sign-up', signup_post)
accountsRouter.get('/logout', logout )

export { accountsRouter }