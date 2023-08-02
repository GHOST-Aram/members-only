export const json = (res, data) =>{
    res.json(data)
}
export const render = (res, template, context) =>{
    res.render(template, context)
}

export const redirect = (res, redirectUrl) =>{
    res.redirect(redirectUrl)
}

export const render404 = (res, template, context) =>{
    res.status(404).render(template, context)
}

export const sendStatus = (res, errorcode) =>{
    res.sendStatus(errorcode)
}

export const status = (res, errorcode) =>{
    res.status(errorcode)
}
