// JS for fronted will be here
const socket=io('/')
const videoGrid=document.getElementById('video-grid');
const myVideo=document.createElement('video');//creating vide html element whose type is video that plays the video

myVideo.muted=true;//stopppping to replay
const peers={}//storing the new users

var peer=new Peer(undefined,{//we use undefined be cause the id is genereated by peer itself
  path:'/peerjs',//peerjs is from server.js
  host:'/',
  port:'4999'
})





let myVideoStream

navigator.mediaDevices.getUserMedia({//it allows us to use viedo/audio from the chrome
  //getusermedia  will accept an object and it is a promise
    video:true,//first attribute
    audio:true
}).then(stream=>{//sream is an argument
    myVideoStream=stream;//storing the video in myvideostream
    addVideoStream(myVideo,stream);
    
    peer.on('call', function(call) {//getting his video

      call.answer(stream); // Answer the call with an A/V stream.
      const video=document.createElement('video')
      call.on('stream', function(uservideoStream) {
        // Show stream in some video/canvas element.
          
        

        addVideoStream(video,uservideoStream);

      });

})

socket.on('user-connected',(userId)=>{
  connectToNewUser(userId,stream);//stream is coming from the promise(myvideostream)
})

})

socket.on('user-disconnected',userId=>{
  if(peers[userId]){ 
    peers[userId].close()
    console.log("disconnected ",userId)
  }
})
  
peer.on('open',id=>{
  console.log(id);//this id refers to the person who join the room
  socket.emit('join-room',Room_Id,id);
})

// socket.emit('join-room',Room_Id)

//moved this for new users(line -24)
// socket.on('user-connected',(userId)=>{
//   connectToNewUser(userId,stream)//stream si coming from the promise(myvideostream)
// })

const connectToNewUser=(userId,stream)=>{//stream is coming from the promise(myvideostream)
  console.log("New User Connected",userId)//This will be displayed only when the user is oined from other device/tab
  const call=peer.call(userId,stream)
  const video=document.createElement('video')
  call.on('stream',uservideoStream=>{//sending our video streaam
    addVideoStream(video,uservideoStream)
  })
  call.on('close', () => {//it removes the video of the user who leaves the meet
    video.remove()
  })
  peers[userId]=call
}

const addVideoStream=(video,stream)=>{//video-taking video object on the element
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
          })
    videoGrid.append(video)
        }

let text=$('input')
$('html').keydown((e)=>{//$('html')it calls the html that is room.ejs
  if(e.which==13 && text.val().length!==0){
    console.log(text.val())
    socket.emit('message',text.val());//socket.emit refers to send the message .here the text value is ent from the frontend
    text.val("")
  }
})

socket.on('createMessage',message=>{
  console.log("server",message)
  $('ul').append(`<li class="message"><b>user</b><br/>${message}`)
  ScrollToBottom()
})

//this will scroll the message to down whenevr the new message is entered
const ScrollToBottom=()=>{
  let d=$('.main__chat__window');
  d.scrollTop(d.prop("scrollHeight"));//d.prop("scrollHeight") is an argument
}

//Mute Our Video

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;//myVideoStream-our current video stream,getAudioTracks()[0]-[0] refers to our audio stream
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
 }

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}
