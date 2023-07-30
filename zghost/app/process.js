import http from 'http'
class Host{

    creatHttpServer = (app) =>{
        return http.createServer(app)
    }

    normalizePort = (val) =>{
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            return val;
        }

        if (port >= 0) {
            return port;
        }

        return false;
    }
}

export const host = new Host()