import { asyncHandler } from "../../zghost/app/init.js"
import { db } from "../../zghost/db/database.js"
import { redirect, render, isMember, render403, render400, render500, isAdmin } from "../../zghost/utils/http-response.js"
import { Post } from "../models/post.js"
import { isAuth } from "../../zghost/utils/http-requests.js"
import { validationResult, validator } from "../../zghost/utils/validation.js"

export const post_get = (req, res) =>{
    render(res, 'club-house/post', { 
        title: 'Create Post', errors: null
    })
}

export const post_post = [
    // Validate and sanitize
    validator.validatePlainText('title', { 
        identifier:'Title', minLength: 4, maxLength: 200 
    }),
    validator.validatePlainText('message', { 
        identifier: 'Message', minLength: 50, maxLength: 300 
    }),

    //Process request and render response
    asyncHandler(async(req, res) =>{

       if(isAuth(req) && isMember(res)){
            const errors = validationResult(req)

            if(errors.isEmpty()){
                req.body.author = res.locals.user.id //Add user to locals
                const {title, message, author} = req.body

                try {
                    await db.createAndSaveDocument(Post, {
                            title, message, author
                    })
    
                    redirect(res,'/')
                    
                } catch (error) {
                    render500(res, 'errorcoded', {
                        title: 'Internal Server Error', 
                        message: 'Sorry Error was on our side, please try again.'
                    })
                }
            } else { 
                render400(res, 'club-house/post', {
                    title: 'Invalid input', errors: errors.array()
                })
            }
            
        } else {
            if( !isAuth(req)){
                redirect(res, '/accounts/login')
            }
            if(!isMember){
                    render403(res, 'unauthorized')
            }
        } 
   })
]

export const post_details = asyncHandler(async(req, res) =>{
    if(!req.isAuthenticated()){
        redirect(res, '/accounts/login')
    } if(res.locals.user.isMember){
        const post = await db.findByIdWithPopulate(
            Post, req.params.id, ['author']
        )
        render(res, 'club-house/post-details', { 
            title: 'Post Details',
            post
        })
    } else{
        render(res.status(403), 'unauthorized', {title: 'Unauthorized'})
    }
})

export const post_delete = asyncHandler(async(req, res) =>{
    if(isAdmin(res)){
        await db.findByIdAndDelete(Post, req.params.id)
        redirect(res, '/')
    } else {
        render(res.status(403), 'unauthorized', {title: 'Unauthorized'})
    }
})