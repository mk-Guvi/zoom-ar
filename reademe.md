1.)create server.js file

2.)install express and nodomon(globally)

3)create a express server 

4.)create view folder and create room.ejs(embded js that is it is html file with js embeded init.EJS will help us to get variables from backend to frontend) file init.install ejs to render it and set the viwe engine as ejs(app.set)

NOTE:

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. 

View Engine is responsible for rendering the view into html form to the browser

5.)install uuid library and import it in server.js

6.)Redirect the home page using uuid to room and print the uuid in console by calling it in ejs file .

7.)create public folder,create script.js file init and import that file in room.ejs.make the  file as static(/it indicates the server that we are going to use public files here) in the server.js file

8.)In script.js,using js,create the event listener named addVideoStream and call it in video grid div element of room.ejs  that will return as the video.

9.)create style.css and import in room.ejs.add some styles to video

10.)Install SOCKET.io

NOTE:

sockets is used for real time communications

It is a library which uses web scokets which is famous for real time comunications

web socket is like a internet protocal.The differece in http and web socket is that,In http the client can request the server and the server can only respond to it but it cannot do a request to the client.Socket.io can request/respond to the client and it is asynchronous.

11.)import socket script in room.ejs

12.)import socket in server.js and create the socket that returns "joined room" in console and call it in script.js using socket.emit(that creates the event named "join-room" and it is listened in server.js).NOTE:import the socket in ejs file too.

13.)store the room id in a  variable in room.ejs and call it in socket.emit in script.js.

14.)In server.js,add socket.join with its roomid(obtainer from join-room event) and use socket broadcast for returning the new user whenever joins that room by emiting the event name "user-connected"

15.) in script.js, call the user-connected event  that returns "new user" joined in the console by callinng  a function named ConnectToNewUser.

16.) Install peer and import it in server.js(call it as middleware) and room.ejs.

Note:

To identify the new user we use peer.js

WebRTC is a free, open-source project that provides web browsers and mobile applications with real-time communication via simple application programming interfaces

PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API.

17.)In Script.js,create the peer server(const peer=new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'4999'
})) and create peer connection by moving the "join-room "-socket in the peer connection and adding an id that refers to person joined and use that id in the socket of server.js 

18.)In script.js,call the userId in "user-connected"-socket as a parameter along its functions that returns the new user id's.

19.)In script.js,use peer.call in "connectouser" function  to get the clients video  and call peer.answer to get the users video in the promise(then).

20.)Add html elements in room.ejs and add css styles to it

21.) add bootsrtap in room.ejs

22.)In Script.js,using jquery,call the html file and use event handler function that returns the text type when enter key is pressed in the frontend.

23.)In server.js,listen the message using sockets sent from the frontend and send back that message in the respective room using socket emit

24.)In script.js,listen the message using sockets sent from the server and return it as html ul element 

25.)in script.js,create a scrolldown function that updates the messages to move scroll upward by adding overflow-y in css of main_chat_window and call this function in the createmessage socket.

26.)IN script.js,add aduio and video function that stops/resumes the video/audio and call it in room.ejs to its respective elements

27.)install heroku globally