import { Router } from '../zghost/app/init.js'
import { redirect } from '../zghost/utils/http-response.js'
import { 
    attendant_details,
    attendants_list,
    join_get, 
    join_post, 
    member_list 
} from './views/members.js'
import { 
    post_delete, 
    post_details, 
    post_get, 
    post_post 
} from './views/posts.js'

const clubRouter = Router()

clubRouter.get('/membsers/:id', (req, res) =>{
    redirect(res, '/attendants/:id')
})

clubRouter.get('/attendants', attendants_list)
clubRouter.get('/attendants/:id', attendant_details)
clubRouter.get('/members', member_list)
clubRouter.get('/members/join', join_get)
clubRouter.post('/members/join', join_post)
clubRouter.get('/post', post_get)
clubRouter.post('/post', post_post)
clubRouter.get('/post/:id', post_details)
clubRouter.get('/post/:id/delete', post_delete)

export {clubRouter}