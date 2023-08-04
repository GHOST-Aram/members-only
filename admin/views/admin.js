import { Code } from "../model.js"
import { db } from "../../zghost/db/database.js"
import { redirect, render, render400, render500 } from "../../zghost/utils/http-response.js"
import { asyncHandler } from "../../zghost/app/init.js"
import { validationResult, validator } from "../../zghost/utils/validation.js"

export const member_pass_get = (req, res) => {
    render(res, 'club-house/member-pass', {
        title: 'Membership Pascode', errors: null
    })
}

export const member_pass_post = [
    validator.validatePlainText('code', {
        identifier: 'Pass Code', minLength: 8, maxlength:24
    }),

    //Process request and render response
    asyncHandler(async(req, res) => {
        const errrors = validationResult(req)

        if(errrors.isEmpty()){
            try {
                await db.createAndSaveDocument(Code, req.body)
                redirect(res, '/') 
            } catch (error) {
                render500(res, 'errorcoded', {
                    title: 'Internal Server Error',
                    message: 'Error occured on our servers please try again.'
                })
            }
        } else {
            render400(res, 'club-house/member-pass', {
                title: 'Invalid Input', errors: errrors.array()
            })
        }

    })
]