import { asyncHandler } from "../../zghost/app/init.js";
import { render } from "../../zghost/utils/http-response.js";
import { Post } from "../models/post.js";

export const index = asyncHandler(async(req, res, next) =>{
    const posts = await Post.find()

    render(res, 'club-house/index', { 
        title: 'Home',
        posts
     });
  })