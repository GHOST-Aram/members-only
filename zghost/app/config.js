import { server } from "../utils/server.js";
import 'dotenv/config'
import { auth } from "./auth.js";
import { enableSession } from "../utils/session.js";


export const runConfigurations = () =>{
    server.loadEnv()
    
    server.connectToMongoDB(process.env.MONGODB_URI)
    //Environment settings
    server.setTemplatesDir('templates')
    server.setViewEngine('ejs')    

    server.useJSON()
    server.useLogger('dev')
    server.useUrlEncordedPayloads({ extended: false })
    server.useStaticFiles('static')

    // Authentication framwork
   enableSession({
    secrete: process.env.SECRETE,
    maxAge: 3600,
    mongoUri: process.env.MONGODB_URI
   })
    
   auth.useLocalStrategy()
   auth.serializeUser()
   auth.deserializeUser()
   auth.initialize()
   auth.authenticateSession()
    


}