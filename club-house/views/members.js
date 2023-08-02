import { User } from '../../accounts/model.js'
import { Code } from '../../admin/model.js'
import { asyncHandler } from '../../zghost/app/init.js'
import { db } from '../../zghost/db/database.js'
import { 
    render, 
    sendStatus,
    redirect,
    render401
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

export const member_list = asyncHandler(async(req, res) =>{
    const members = await db.filterAll(User, { isMember: true })
    render(res, 'club-house/members-list', {
        title: 'Club Members', 
        members,
    })
})

export const attendants_get = asyncHandler(async(req, res) =>{
    const allAttendants = await db.findAll(User)
    render(res, 'club-house/members-list', {
        title: 'All Attendants', 
        members: allAttendants,
    })
})

export const attendant_details = asyncHandler(async(req, res) =>{
    if(req.isAuthenticated() && res.locals.user.isAdmin){
        const attendant = await db.findById(User, req.params.id)
        render(res, 'club-house/attendant-details', {
            title: 'Attendant Details', attendant
        })
    } else {
        render401(res, 'unauthorized')
    }     
})