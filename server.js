const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid"); //importing the version 4 of uuid

const { ExpressPeerServer } = require("peer");

const peerServer = ExpressPeerServer(server, {
  debug: true
});

const io = require("socket.io")(server); //specifying the server

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public")); //this indicates the server that public files will be here

app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  // res.status(200).send("Hello mk")
  //res.render("room")//render used to render a file
  res.redirect(`/${uuidv4()}`); //it redirects to the url with uuid which takes to :room
});

app.get("/:room", (req, res) => {
  //:room is like a parameter.
  res.render("room", { roomId: req.params.room }); //uuid is stored in roomId which can be used in EJS
});

//Inside the socket.io we are creating a connection
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    //userId refers to the person who joined and it is called from the peer connections
    console.log("Joined the room"); //this will be returned in the server
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId); //this will display to all the user who is in the room
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
    socket.on("message", (message) => {
      //this will listen the message
      io.to(roomId).emit("createMessage", message); //sending the message again to the frontend to the specific roomId
    });
  });
});
//to tell that this socket joined the room we need to call it in script.js
server.listen(process.env.PORT || 3030, () => {
  //process.env.PORT-this will work when you are in heroku server
  console.log("server running at 4k ");
});
