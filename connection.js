const WebSocketClient = require("websocket").client;

function connectToServer() {
  const client = new WebSocketClient();

  return new Promise((resolve, reject) => {
    client.on("connectFailed", function (error) {
      console.log(`Connect Error: ${error.toString()}`);
      reject(error);
    });

    client.on("connect", function (connection) {
      console.log("WebSocket Client Connected");

      connection.on("error", function (error) {
        console.log(`Connection Error: ${error.toString()}`);
        reject(error);
      });

      connection.on("close", function () {
        console.log("Connection Closed");
      });

      resolve(connection);
    });

    client.connect("ws://172.16.0.157:80");
  });
}

exports.connectToServer = connectToServer;
