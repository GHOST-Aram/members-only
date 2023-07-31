import { server } from "../utils/server.js";
import 'dotenv/config'


export const runConfigurations = () =>{
    server.loadEnv()
    
    server.connectToMongoDB(process.env.MONGODB_URI).then(
        result => console.log('SeRver successfully connected to MongoDB')
    ).catch(error => console.error(error))

    server.setTemplatesDir('templates')
    server.setViewEngine('ejs')    

    server.useJSON()
    server.useLogger('dev')
    server.useUrlEncordedPayloads({ extended: false })
    server.useStaticFiles('static')
}