
module.exports = function (http, port, app, debug) {

    /**
     * Create HTTP server.
     */
    var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    //server.listen();
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    //-----------------------------------------------------------

   //SOCKET.IO
    //const io = require('./socket_io');
    //io(server);
    
    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
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
        console.log('Server created')
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
        console.log(addr)
    }

}//END module.exports

