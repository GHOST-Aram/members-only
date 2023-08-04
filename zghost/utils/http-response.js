export const isAdmin =  (res) => res.locals.user.isAdmin
export const isMember = (res) =>  res.locals.user.isMember
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

export const render403 = (res, template) =>{
    res.status(403).render(template, {title: 'Forbiden'})
}

export const render401 = (res, template) =>{
    res.status(401).render(template, {title: 'Unauthorized'})
}

export const render400 = (res, template, context) =>{
    res.status(400).render(template, context)
}

export const render500 = (res, template, context) =>{
    res.status(400).render(template, context)
}

export const sendStatus = (res, errorcode) =>{
    res.sendStatus(errorcode)
}

export const status = (res, errorcode) =>{
    res.status(errorcode)
}
