var apiKey = "47469071";
var sessionId = "1_MX40NzQ2OTA3MX5-MTY0Nzg4MTY4NDcyOX5CSG9ZblJJcG50NlNjVFkzM1lwMVVPb0l-fg";
var token = "T1==cGFydG5lcl9pZD00NzQ2OTA3MSZzaWc9Mjc3MmQ2YTk5NGQ1YjYxZGYwOTAzNmM1NTg3NDAzZmQyMTU4YjVhZDpzZXNzaW9uX2lkPTFfTVg0ME56UTJPVEEzTVg1LU1UWTBOemc0TVRZNE5EY3lPWDVDU0c5WmJsSkpjRzUwTmxOalZGa3pNMWx3TVZWUGIwbC1mZyZjcmVhdGVfdGltZT0xNjQ3ODgxNzE3Jm5vbmNlPTAuMDY2MjY3NTA1MTgzNzU1Nzkmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY0ODQ4NjUxNiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";


// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

// (optional) add server code here
initializeSession();

var toggleAudio = document.getElementById("on-offAudio");
var toggleVideo = document.getElementById("on-offVideo");
var publisher;
var videoOn = true;
var audioOn = true;

  
toggleAudio.onclick = function() {
    
    if(audioOn) {
        audioOn = false;
        publisher.publishAudio(false);  
    } else {
        audioOn = true;
        publisher.publishAudio(true);
    }
}

toggleVideo.onclick = function() {
    
    if(videoOn) {
        videoOn = false;
        publisher.publishVideo(false);
    } else {
        videoOn = true;
        publisher.publishVideo(true);
    }
    
}
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });
  
    // Create a publisher
    var pubOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        publishAudio: true,
        publishVideo: true
    };
    publisher = OT.initPublisher('publisher', pubOptions, handleError);
    console.log('Publishere: ', publisher);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }

