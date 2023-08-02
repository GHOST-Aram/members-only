import { auth } from "../../zghost/app/auth.js"

export const logout = (req, res, next) =>{
    auth.logout(req, next)
}