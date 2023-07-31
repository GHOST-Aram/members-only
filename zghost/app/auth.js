import { hash } from "bcrypt"
import { User } from "../../accounts/model.js"
import { db } from "../db/database.js"
class Authentication{
    registerUser = async ({first_name, last_name, email, username, password}) =>{
        hash(password, 10, async(err, hashedPasscode) =>{
            if(err) throw err
            await db.createAndSaveDocument(User, {
                first_name: first_name,
                last_name: last_name,
                email: email,
                username: username,
                password: hashedPasscode,
            })
        })
    }
}

export const auth = new Authentication()