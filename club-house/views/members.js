import { User } from '../../accounts/model.js'
import { Code } from '../../admin/model.js'
import { asyncHandler } from '../../zghost/app/init.js'
import { db } from '../../zghost/db/database.js'
import { 
    render, 
    sendStatus,
    json,
    redirect
 } from '../../zghost/utils/http-response.js'

export const join_get = (req, res) =>{
    render(res, 'club-house/join', {title: 'Join Club'})
}

export const join_post = asyncHandler(async(req, res) =>{
    const code = await db.findOne(Code, {code: req.body.code})

    if(code){
        const updated = await db.findByIdAndUpdate(
            User, res.locals.user.id, {isMember: true}
        )
        redirect(res, '/')
    } else {
        sendStatus(res, 400)
    }
})