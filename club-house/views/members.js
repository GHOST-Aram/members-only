import { User } from '../../accounts/model.js'
import { Code } from '../../admin/model.js'
import { asyncHandler } from '../../zghost/app/init.js'
import { db } from '../../zghost/db/database.js'
import { isAuth } from '../../zghost/utils/http-requests.js'
import { 
    render, 
    redirect,
    render401,
    isAdmin,
    isMember,
    render400,
 } from '../../zghost/utils/http-response.js'
import { validationResult, validator } from '../../zghost/utils/validation.js'

export const join_get = (req, res) =>{
    //Display this form for authenticated none members only
    if(isAuth(req) && !isMember(res)) {
        render(res, 'club-house/member-pass', {
            title: 'Join Club', errors: null
        })
    } else {
        render401(res, 'unauthorized')
    }
}

export const join_post = [
    // Validate and sanitize input
    validator.validatePlainText('code', {
        identifier: 'Pass Code', minLength: 8, maxlength:24
    }),

    asyncHandler(async(req, res) =>{
        const errors = validationResult(req)

        if(errors.isEmpty()){
            if(isAuth(req)){ 
                try {
                    const code = await db.findOne(Code, {code: req.body.code})
                
                    if(code){ //code is a match
                            await db.findByIdAndUpdate(
                            User, res.locals.user.id, {isMember: true}
                        )
                        redirect(res, '/')
                    } else { //code not a match
                        render400(res, 'club-house/member-pass', {
                            title: 'Invalid Request',
                            errors: [
                                {msg: 'The passcode you  entered is incorrect. Please try again'}
                            ]
                        })
                    }
                    
                } catch (error) {
                    render(res.status(500), 'errorcoded', {
                        title: 'Internal server error',
                        message: 'An error occurred on our side. Please try again later.'
                    })
                }
            } else{ //unauthenticated user
                render401(res, 'unauthorized')
            }
        } else {
            render(res.status(400), 'club-house/member-pass', {
                title: 'Invalid Pass Code',
                errors: errors.array()
            })
        }
    })
]

export const member_list = asyncHandler(async(req, res) =>{
    if(isAuth(req) && isAdmin(res)){ //User is admin
        const members = await db.filterAll(User, { isMember: true })
        render(res, 'club-house/members-list', {
            title: 'Club Members', 
            members,
        })
    } else { //User is not admin- not authorized to view this content
        render401(res, 'unauthorized')
    }
})

export const attendants_list = asyncHandler(async(req, res) =>{
    if(isAuth(req) && isAdmin(res)){
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
    
    if(isAuth(req) && isAdmin(res)){
        // Admin with clearance
        const attendant = await db.findById(User, req.params.id)
        render(res, 'club-house/attendant-details', {
            title: 'Attendant Details', attendant
        })
    } else { //Not admin, has no clearance
        render401(res, 'unauthorized')
    }     
})