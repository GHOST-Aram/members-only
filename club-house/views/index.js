import { asyncHandler } from "../../zghost/app/init.js";
import { render } from "../../zghost/utils/http-response.js";
import { Message } from "../models/message.js";

export const index = asyncHandler(async(req, res, next) =>{
    const posts = await Message.find()

    render(res, 'club-house/index', { 
        title: 'Home',
        posts
     });
  })