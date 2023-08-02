import { compareSync, hash } from "bcrypt"
import passport from 'passport'
import { User } from "../../accounts/model.js"
import { db } from "../db/database.js"
import { app } from "./init.js"
import LocalStrategy from 'passport-local'
import session from "express-session"
import MongoStore from "connect-mongo"

class Authentication{

    authenticateRoute = ({successRedirect, failureRedirect}) =>{
        return passport.authenticate('local', {
           successRedirect: successRedirect,
           failureRedirect: failureRedirect,
            
        })
    }

    authenticateSession = () =>{
        app.use(passport.session())
    }

    deserializeUser = () =>{
        return passport.deserializeUser(async(id, done) =>{
            try {
                const user =  await db.findById(User, id)
                done(null, user)
            } catch (error) {
                done(error, false)
            }
        })
    }

    initialize = () =>{
        app.use(passport.initialize())
    }

    logout = (request , next) =>{
        request.logout((err) =>{
            if(err) 
                return next(err)
        })
        next()
    }

    registerUser = async ({first_name, last_name, email, username, password}) =>{
        hash(password, 10, async(err, hashedPasscode) =>{
            if(err) throw err
            await db.createAndSaveDocument(User,{
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: hashedPasscode,
            } )
        })
    }

    serializeUser = () =>{
        passport.serializeUser((user, done) =>{
            return done(null, user.id)
        })
    }

    setupSession = ({secrete, maxAge, mongoUri}) =>{
        app.use(session({
            secret: secrete,
            resave: false,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: mongoUri
            }),
            cookie: {
                maxAge: maxAge
            }
        }))
    }

    useLocalStrategy = () => {
        return passport.use(new LocalStrategy(async(username, password, done) => {
            try {
                return await this.#verifyUserInfo(username, password, done)
            } catch (error) {
                return done(error, false, {
                    message: 'Unexpected error occured during authentication'
                })
            }
        }))
    }

    #verifyUserInfo = async(username, password, done) => {

        const user = await db.findOne(User, { username: username })
        if(!user){
            return done(null, false, {
                message: 'Username not registered'
            })
        }
        console.log(user.email)
        const isValidPassword = await this.#validatePassword(
            password, user.password
        )
        if(isValidPassword){
            return done(null, user)
        }else{
            return done(null, false, {
                message: 'Incorrect password'
            })
        }
    }

    #validatePassword = async(inputPassword, savedPassowrd) => {
        console.log(inputPassword, savedPassowrd)
        return compareSync(inputPassword, savedPassowrd)
    }
}

export const auth = new Authentication()