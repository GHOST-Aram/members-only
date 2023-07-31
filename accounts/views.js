import { render } from "../zghost/utils/http-response.js";

export const sign_up_get = (req, res) =>{
    render(res, 'accounts/sign-up', { title: 'Sign Up' })
}