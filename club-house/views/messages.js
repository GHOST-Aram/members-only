import { db } from "../../zghost/db/database.js"
import { redirect, render } from "../../zghost/utils/http-response.js"
import { Message } from "../models/message.js"

export const message_get = (req, res) =>{
    render(res, 'club-house/post', { title: 'Create Post'})
}

export const message_post = (req, res) =>{
    db.createAndSaveDocument(Message, req.body)
    redirect(res, '/')
}