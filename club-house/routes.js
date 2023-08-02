import { Router } from '../zghost/app/init.js'
import { message_details, message_get, message_post } from './views/messages.js'

const clubRouter = Router()

clubRouter.get('/post', message_get)
clubRouter.post('/post', message_post)
clubRouter.get('/message/:id', message_details)

export {clubRouter}