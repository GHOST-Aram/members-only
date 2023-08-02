import { auth } from "../../zghost/app/auth.js";
import { asyncHandler } from "../../zghost/app/init.js";
import { 
    redirect, 
    render, 
    sendStatus 
} from "../../zghost/utils/http-response.js";

export const signup_get = (req, res) =>{
    render(res, 'accounts/sign-up', { title: 'Sign Up' })
}

export const signup_post = asyncHandler(async(req, res) =>{
    const { first_name, 
        last_name,
        username,
        email, 
        password,
        confirm_password } = req.body
    if(password === confirm_password){
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
    }

})
    
