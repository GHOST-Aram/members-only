import MongoStore from 'connect-mongo'
import session from 'express-session'

export const enableSession = ({secrete, maxAge, mongoUri}) =>{
    return session({
        secret: secrete,
        resave: true,
        saveUninitialized: true,
        // store: MongoStore.create({
        //     mongoUrl: mongoUri,
        // }),
        cookie: {
            maxAge: maxAge
        }
    })
}