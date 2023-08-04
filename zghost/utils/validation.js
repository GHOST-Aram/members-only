import { body, validationResult } from "express-validator";
import { db } from "../db/database.js";
import { User } from "../../accounts/model.js";

class Validitor{
    validateName = (field) => {
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to fill all the required name fields.')
            .isLength({ min: 2, max: 200 })
            .withMessage('Please enter a name of length between 2 and 200')
            .escape()
    }


    validateEmail = (field) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to include your email.')
            .isLength({ min: 10, max: 200 })
            .withMessage('Please enter an email of length between 10 and 200')
            .escape()
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom(async(email) =>{
                //Check if email has been reistered.
                const user = await db.findOne(User, { email })
                if(user){
                    throw new Error(
                        `The Email ${ email } has already been registered.`
                    )
                }
            })
            
    }

    validatePassword = (field) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Password field cannot be empty.')
            .isLength({ min: 8, max: 24 })
            .withMessage(
                'Please enter a password of length between 8 and 24.'
            )
            .isAlphanumeric()
            .withMessage('Please Entern an alphanumeric password.')
            .escape()
    }

    validatePlainText = (field, { identifier, minLength, maxlength }) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage(
                `${ identifier } field cannot be empty.`
            )
            .isLength({ min: minLength, max: maxlength})
            .withMessage(
                `${ identifier } field should be of lenght between 
                ${ minLength } and ${ maxlength } characters.`
            )
            .escape()
            .custom(async(value) =>{
                const regex = /[A-Za-z\s]+/

                if(!regex.test(value)){
                    throw new Error(
                        `Value ${identifier} field can only contain 
                        aplhabetical letters and optional spaces`
                    )
                }
            })
    }

    validateUsername = (field) =>{
        return body(field)
            .trim()
            .notEmpty()
            .withMessage('Username field cannot be empty')
            .isLength({ min: 2, max: 20 })
            .withMessage('Username length must be between 2 and 20 characters.')
            .escape()
            .custom(async username =>{
                //Check username against accepted characters only
                const regex = /^[A-Za-z]+[A-Za-z0-9_]*$/
                if(!regex.test(username)){
                    throw new Error(
                        'Username can only contain alphanumeric'+ 
                        'characters and an optional underscore.'
                    )
                }
            })
    }

    runValidations = (validations) =>{
        return async( req, res, next) =>{
            for(let validation of validations){
                const result = await validation.run(req)

                if(result.errors.length){
                    break
                }
            }

            const errors = validationResult(req)

            if(errors.isEmpty()){
                return next()
            } else {
                res.status(400).json({errors: errors.array()})
            }
        }
    }
}

export { validationResult }
export const validator = new Validitor()