import { auth } from "../../zghost/app/auth.js"
import { render } from "../../zghost/utils/http-response.js"

export const login_get = (req, res) =>{
    render(res,'accounts/login', { title: 'Log in'})
}

export const login_post = auth.authenticateRoute({
        successRedirect: '/',
        failureRedirect: '/accounts/login'
    })
