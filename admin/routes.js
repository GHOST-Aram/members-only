import { Router } from '../zghost/app/init.js'
import { member_pass_get } from './views/admin.js'

const adminRouter = Router()

adminRouter.get('/member-pass', member_pass_get)

export { adminRouter }