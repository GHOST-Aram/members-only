import { Router } from '../zghost/app/init.js'
import { message_get, message_post } from './views/messages.js'

const clubRouter = Router()

clubRouter.get('/post', message_get)
clubRouter.post('/post', message_post)

export {clubRouter}