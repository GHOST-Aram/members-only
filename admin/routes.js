import { Router } from '../zghost/app/init.js'
import { member_pass_get, member_pass_post } from './views/admin.js'

const adminRouter = Router()

adminRouter.get('/member-pass', member_pass_get)
adminRouter.post('/member-pass', member_pass_post)

export { adminRouter }