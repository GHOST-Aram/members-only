import { auth } from "../../zghost/app/auth.js";
import { asyncHandler } from "../../zghost/app/init.js";
import { db } from "../../zghost/db/database.js";
import { User } from "../model.js";
import { 
    redirect, 
    render, 
    render400, 
    sendStatus 
} from "../../zghost/utils/http-response.js";
import { validationResult, validator } from "../../zghost/utils/validation.js";
import { matchedData } from "express-validator";

export const signup_get = (req, res) =>{
    render(res, 'accounts/sign-up', { 
        title: 'Sign Up', errors: null })
}

export const signup_post = [
    validator.validateEmail('email'),
    validator.validateName('first_name'),
    validator.validateName('last_name'),
    validator.validatePassword('password'),
    validator.validatePassword('confirm_password').custom(
        async(confirm_password, {req}) =>{
            const { password } = matchedData(req)

            if(confirm_password !== password)
                throw new Error('Passwords are not identical.')
        }
    ),
    validator.validateUsername('username').custom(async(username) =>{
        //Check if username has been taken
        const user = await db.findOne(User, {username})
        console.log(user)
        if(user){
            throw new Error('Username has already been taken.')
        }
    }),

    asyncHandler(async(req, res) =>{
        const { first_name, 
            last_name,
            username,
            email, 
            password } = req.body
    
        const errors = validationResult(req)

        if(errors.isEmpty()){
            try {
                await auth.registerUser({
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    email: email,
                    password: password,
                })   
    
                redirect(res, '/')
            } catch (err) {
                sendStatus(res, 500) 
            }
        } else{
            render400(res, 'accounts/sign-up', {
                title: 'Invalid credentials', errors: errors.array()
            })
        }
    })
]
    
