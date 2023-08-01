import MongoStore from 'connect-mongo'
import session from 'express-session'
import { app } from '../app/init.js'

export const enableSession = ({secrete, maxAge, mongoUri}) =>{
    app.use(session({
        secret: secrete,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: mongoUri,
        }),
        cookie: {
            maxAge: maxAge
        }
    }))
}