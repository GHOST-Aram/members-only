import { auth } from "../../zghost/app/auth.js"
import { redirect } from "../../zghost/utils/http-response.js"

export const logout = (req, res, next) =>{
    auth.logout(req, next)
    redirect(res, '/')
}