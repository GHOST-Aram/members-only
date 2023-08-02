import { render } from "../../zghost/utils/http-response.js"

export const member_pass_get = (req, res) =>{
    render(res, 'admin/member-pass', {title: 'Membership Pascode'})
}

