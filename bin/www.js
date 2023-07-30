import {app} from '../app.js';
import { host } from '../zghost/app/process.js';
import { server as webserver } from '../zghost/utils/server.js';
import { debugg } from '../zghost/app/init.js'



/**
 * Get port from environment and store in Express.
 */

const port = host.normalizePort(process.env.PORT || '3000');

webserver.setPort(port)

const server = host.creatHttpServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
		case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
		default:
		throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debugg('Listening on ' + bind);
}
