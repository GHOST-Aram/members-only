import { asyncHandler } from "../../zghost/app/init.js";
import { render, render404 } from "../../zghost/utils/http-response.js";
import { Post } from "../models/post.js";

export const index = asyncHandler(async(req, res, next) =>{
    const posts = await Post.find()

    render(res, 'club-house/index', { 
        title: 'Home',
        posts
     });
})

export const not_found = (req, res) =>[
    render404(res, '404', {title: 'Not Found'})
]