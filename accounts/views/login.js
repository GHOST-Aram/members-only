import { auth } from "../../zghost/app/auth.js"
import { render, render400 } from "../../zghost/utils/http-response.js"
import { validationResult, validator } from "../../zghost/utils/validation.js"

export const login_get = (req, res) =>{
    render(res,'accounts/login', { 
        title: 'Log in', errors: null
    })
}

export const login_post = [
    validator.validateUsername('username'),
    validator.validatePassword('password'),

    //Check for errors
    (req, res, next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){//render form with errors
            render400(res, 'accounts/login', {
                title: 'Invalid Credentials', errors: errors.array()
            })
        }
        next()
    },

    auth.authenticateRoute({
        successRedirect: '/',
        failureRedirect: '/accounts/login',
    })        
] 
