import { app, express } from "../app/init.js";
import { config } from "dotenv";
import { connect } from "mongoose";
import compression from 'compression'
import helmet from 'helmet'
import morgan from "morgan";


class Server{
    connectToMongoDB = (DB_URI) =>{
        connect(DB_URI).then(
            result => console.log('SeRver successfully connected to MongoDB')
        ).catch(error => console.error(error))
    }
    loadEnv = () =>{
        config
    }

    setTemplatesDir = (dirname) =>{
        app.set('views', dirname)
    }

    setPort = (port) =>{
        app.set('port', port)
    }
    setViewEngine = (engine) =>{
        app.set('view engine', engine)
    }
    
    useCompression = () =>{
        app.set(compression())
    }
    useHelmet = () => {
        app.use(helmet())
    }
    useJSON = () =>{
        app.use(express.json())
    }

    useLogger = (mode) =>{
        app.use(morgan(mode))
    }
    useStaticFiles = (staticdir) =>{
        app.use(express.static(staticdir))
    }
    useUrlEncordedPayloads = (option) =>{
        app.use(express.urlencoded(option))
    }
}

export const server = new Server()