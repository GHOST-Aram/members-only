import { asyncHandler } from "../../zghost/app/init.js"
import { db } from "../../zghost/db/database.js"
import { redirect, render } from "../../zghost/utils/http-response.js"
import { Post } from "../models/post.js"

export const post_get = (req, res) =>{
    render(res, 'club-house/post', { title: 'Create Post'})
}

export const post_post = (req, res) =>{
    req.body.author = res.locals.user.id//add user from locals
    db.createAndSaveDocument(Post, req.body)
    redirect(res,'/')
}

export const post_details = asyncHandler(async(req, res) =>{
    if(!req.isAuthenticated()){
        redirect(res, '/accounts/login')
    } if(res.locals.user.isAdmin){
        const post = await db.findByIdWithPopulate(
            Post, req.params.id, ['author']
        )
        render(res, 'club-house/post-details', { 
            title: 'Post Details',
            post
        })
    } else{
        res.sendStatus(403)//unauthorized
    }
})

export const post_delete = asyncHandler(async(req, res) =>{
    await db.findByIdAndDelete(Post, req.params.id)
    redirect(res, '/')
})