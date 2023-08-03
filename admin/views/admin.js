import { Code } from "../model.js"
import { db } from "../../zghost/db/database.js"
import { redirect, render } from "../../zghost/utils/http-response.js"
import { asyncHandler } from "../../zghost/app/init.js"

export const member_pass_get = (req, res) => {
    render(res, 'club-house/member-pass', {title: 'Membership Pascode'})
}

export const member_pass_post = asyncHandler(async(req, res) => {
    await db.createAndSaveDocument(Code, req.body)
    redirect(res, '/')
})