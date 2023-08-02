import { Router } from '../zghost/app/init.js'
import { message_delete, message_details, message_get, message_post } from './views/messages.js'

const clubRouter = Router()

clubRouter.get('/post', message_get)
clubRouter.post('/post', message_post)
clubRouter.get('/post/:id', message_details)
clubRouter.get('/post/:id/delete', message_delete)

export {clubRouter}