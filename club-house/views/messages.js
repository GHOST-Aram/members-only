import { render } from "../../zghost/utils/http-response.js"

export const message_get = (req, res) =>{
    render(res, 'club-house/post', { title: 'Create Post'})
}

export const message_post = (req, res) =>{
    res.json(req.body)
}