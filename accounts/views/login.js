import { auth } from "../../zghost/app/auth.js"
import { asyncHandler } from "../../zghost/app/init.js"
import { render } from "../../zghost/utils/http-response.js"

export const login_get = (req, res) =>{
    render(res,'accounts/login', { title: 'Log in'})
}

export const login_post = asyncHandler(async(req, res) =>{
    auth.authenticateRoute({
        successRedirect: '/',
        failureRedirect: '/accounts/login'
    })
})