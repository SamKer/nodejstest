'use strict';
const EventEmitter = require('events').EventEmitter;
const WebSocketServer = require('websocket').server;
const http = require('http');
class ServerWebSocket extends EventEmitter {
    constructor(port) {
        super();
        this.port = port;
        this.clients = {};




        var server = http.createServer().listen(this.port, ()=> {console.log('websocket listening on localhost:'+this.port)});

        this.socket = new WebSocketServer({
            httpServer: server
        });

        // This callback function is called every time someone
// tries to connect to the WebSocket server
        this.socket.on('request', (request) => {
            console.log((new Date()) + ' Connection from origin '
                + request.origin + '.');


            var connection = request.accept(null, request.origin);
            // we need to know client index to remove them on 'close' event
            // var index = this.clients.push(connection) - 1;
            var userName = false;
            var userColor = false;

            console.log((new Date()) + ' Connection accepted.');


            // user sent some message
            connection.on('message', (message) => {

                if (message.type === 'utf8') { // accept only text
                    // first message sent by user is their name
                    var data = JSON.parse(message.utf8Data);
                    userName = data.userName;

                    this.clients[userName] = connection;
                    console.log(userName, 'say', data.message);
                    connection.sendUTF(JSON.stringify({"message": "yo bro"}));
                }
            });

            // user disconnected
            connection.on('close', function(connection) {
                if (userName !== false && userColor !== false) {
                    console.log((new Date()) + " Peer "
                        + connection.remoteAddress + " disconnected.");

                    // remove user from the list of connected clients
                    clients.splice(index, 1);
                    // push back user's color to be reused by another user
                    colors.push(userColor);
                }
            });
        });
    }

    notify() {
        if(!('interval' in this)) {
            this.timer = 0;
            this.interval = setInterval((e) => {
                this.notify();
            }, 1000);
        } else {
            this.timer++;
            for(let i in this.clients) {
                let conn = this.clients[i];
                conn.sendUTF(JSON.stringify({message: "new notification: at "+this.timer, time:this.timer}));
            }
        }
    }
}

module.exports = ServerWebSocket;