import { render } from '../../zghost/utils/http-response.js'

export const join_get = (req, res) =>{
    render(res, 'club-house/join', {title: 'Join Club'})
}