import { server } from "../utils/server.js";


export const runConfigurations = () =>{
    server.loadEnv()
    server.setTemplatesDir('templates')
    server.setViewEngine('ejs')    

    server.useJSON()
    server.useLogger('dev')
    server.useUrlEncordedPayloads({ extended: false })
    server.useStaticFiles('static')
}