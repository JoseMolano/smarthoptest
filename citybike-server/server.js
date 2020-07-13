const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require('axios')

const cityBikeUrl = "http://api.citybik.es/v2/networks/decobike-miami-beach"

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);
let interval;

io.on("connection", socket => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;

  console.log('New connection ' + socketId + ' from ' + clientIp);

  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => getBicycles(socket), 3000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getBicycles = async socket => {
  try {
    const res = await axios.get(cityBikeUrl);
    socket.emit('bikesApi', res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
}

server.listen(port, () => console.log(`Listening on port ${port}`));
