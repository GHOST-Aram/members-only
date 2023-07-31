import { auth } from "../zghost/app/auth.js";
import { asyncHandler } from "../zghost/app/init.js";
import { redirect, render } from "../zghost/utils/http-response.js";
import { validator, validationResult } from "../zghost/utils/validation.js";

export const display_signup_form = (req, res) =>{
    render(res, 'accounts/sign-up', { title: 'Sign Up' })
}

export const register_user = [
    validator.validateEmail('email'),
    validator.validateName('first_name'),
    validator.validateName('last_name'),
    validator.validateName('username'),
    validator.validatePassword('password'),
    validator.validatePassword('confirm_password'),

    asyncHandler(async(req, res) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            render(res, 'error-gen', {
                title: 'Invalid Values',
                message: 'Some of the information you provided' +
                        'for registeration were innvalid. Try again'
            })
        } else {
            if(req.body.password === req.body.confirm_password){
                try {
                    await auth.registerUser({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password
                    })   

                    redirect(res, '/')
                } catch (err) {
                    render(res, 'error-gen', {
                        title: 'Error while registering User',
                        message: 'Something went wrong on our side. Please try again.'
                    }) 
                }
            }
        }
    })
    
]