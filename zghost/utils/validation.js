import { body, validationResult } from "express-validator";

class Validitor{
    validateName = (identifier) => {
        return body(identifier)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to fill all the required name fields.')
            .isLength({ min: 2, max: 200 })
            .withMessage('Please enter a name of length between 2 and 200')
            .escape()
    }

    validateEmail = (identifier) =>{
        return body(identifier)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to include your email.')
            .isLength({ min: 10, max: 200 })
            .withMessage('Please enter an email of length between 10 and 200')
            .escape()
            .isEmail()
            .withMessage('Please enter a valid email')
            
    }

    validatePassword = (identifier) =>{
        return body(identifier)
            .trim()
            .notEmpty()
            .withMessage('Please ensure to fill in all the password fields')
            .isLength({ min: 8, max: 24 })
            .withMessage('Please enter a password of length between 8 and 24.')
            .isAlphanumeric()
            .withMessage('Please Entern an alphanumeric password.')
            .escape()
    }
}

export { validationResult }
export const validator = new Validitor()