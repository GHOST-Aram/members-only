import { server } from "../utils/server.js";
import 'dotenv/config'
import { auth } from "./auth.js";


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
   auth.setupSession({
    secrete: process.env.SECRETE,
    maxAge: 24 * 3600 * 1000,
    mongoUri: process.env.MONGODB_URI
   })
    
   auth.initialize()
   auth.authenticateSession()
   auth.useLocalStrategy()
   auth.serializeUser()
   auth.deserializeUser()
    


}