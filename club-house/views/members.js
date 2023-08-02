import { User } from '../../accounts/model.js'
import { Code } from '../../admin/model.js'
import { asyncHandler } from '../../zghost/app/init.js'
import { db } from '../../zghost/db/database.js'
import { isAuth } from '../../zghost/utils/http-requests.js'
import { 
    render, 
    sendStatus,
    redirect,
    render401,
    isAdmin,
    isMember,
    render400,
    render403
 } from '../../zghost/utils/http-response.js'

export const join_get = (req, res) =>{
    //Display this form for authenticated none members only
    if(isAuth(req) && !isMember(res) && isMember) {
        render(res, 'club-house/join', {title: 'Join Club'})
    } else {
        render401(res, 'unauthorized')
    }
}

export const join_post = asyncHandler(async(req, res) =>{
    if(isAuth(req)){ //Authenticated user
        const code = await db.findOne(Code, {code: req.body.code})
    
        if(code){ //code is a match
            const updated = await db.findByIdAndUpdate(
                User, res.locals.user.id, {isMember: true}
            )
            redirect(res, '/')
        } else { //code not a match
            render400(res, 'bad-request', {
                title: 'Invalid Request',
                message: 'The passcode you  entered is incorrect. Please try again'
            })
        }
    } else{ //unauthenticated user
        render401(res, 'unauthorized')
    }
})

export const member_list = asyncHandler(async(req, res) =>{
    if(isAuth(req) && isMember(res) && isAdmin(res)){ //User is admin
        const members = await db.filterAll(User, { isMember: true })
        render(res, 'club-house/members-list', {
            title: 'Club Members', 
            members,
        })
    } else { //User is not admin- not authorized to view this content
        render401(res, 'unauthorized')
    }
})

export const attendants_get = asyncHandler(async(req, res) =>{
    if(isAuth(req) && isMember(res) && isAdmin(res)){
        //Admin clearance can see everything
        const allAttendants = await db.findAll(User)
        render(res, 'club-house/members-list', {
            title: 'All Attendants', 
            members: allAttendants,
        })
    } else { //anyone else is not cleared to see this
        render401(res, 'unauthorized')
    }
})

export const attendant_details = asyncHandler(async(req, res) =>{
    
    if(isAuth(req) && isAdmin(res) && isMember(res)){
        // Admin with clearance
        const attendant = await db.findById(User, req.params.id)
        render(res, 'club-house/attendant-details', {
            title: 'Attendant Details', attendant
        })
    } else { //Not admin, has no clearance
        render401(res, 'unauthorized')
    }     
})