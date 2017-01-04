$(document).ready(function() {
  var testNumber = 1;
  var readMessages = [];
  var myText = 'this is my ' + testNumber + ' test.';
  var user = window.location.search.split('username=')[1];
  var activeRoom = 'main';
  var rooms = ['main'];
  var friends = {};
  // var lastID = '';
  // var havePosted = false;

  $('#viewMessages').on('click', function() {
    testNumber++;
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (incoming) {
        console.log('chatterbox: Message received');
        console.log(incoming);
        readMessages = incoming.results;
        postMessages(readMessages);
      },
      error: function (incoming) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', incoming);
      }
    });
    //console.log('readMessages is: ' + readMessages);

  });


  $('#submitMessage').on('click', function(){
    var myText = $('#input').val();
    var message = {
      username: user,
      text: myText,
      roomname: activeRoom
    };
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log(data);
        // $('#chats').append(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  });


  var postMessages = function(readMessages) {
    var index = readMessages.length - 1;
    //var reachedMatch = false;
    while (index >= 0) {
      var msg = readMessages[index];
      var user = msg.username;
      var text = msg.text;
      var textID = msg.objectId;
      var room = msg.roomname;
      if (rooms.indexOf(room) === -1) {
        addRoom(room);
      }
      //console.log('code is not breaking at 1');
      //if (reachedMatch || !havePosted) {
        //console.log('code is not breaking at 2');
      var $user = $("<a class='username'> </a>");
      var $message = $("<div class='message'></div>");
      //console.log($message);
      //$message.html('<p id = ' + textID + '><strong>'+ user + "</strong><br>" + text + '</p>');
      $user.text(user);
      $message.text(text);
      $('#chats').prepend($message);
      $('#chats').prepend($user);

      //}
      /*
      else {
        reachedMatch = (textID === lastID);
      }
      lastID = textID;*/
      toggleFriend();
      index--;
    }
    //havePosted = true;
  };

  $('#makeNewRoom').on('click', function(){
    activeRoom = $('#newRoom').val();
    console.log(activeRoom);
    addRoom(activeRoom);
  });

  var addRoom = function(room){
    rooms.push(room);
    var $room = $('<a class = "roomName"></a>');
    $room.text(room);
    $('#listOfRooms').append($room);
    $('.roomName').on('click', function(event) {
      var room = event.target.innerText;
      console.log("Room: " + room);
      var currentID = room;
      $(this).attr('id', room);
      console.log('This is', $(this));
      console.log('My id '+ currentID);
      var roomMessages = readMessages.filter(function(message){
        return currentID === message.roomname;
      });
      postMessages(roomMessages);
    });
  }

  var toggleFriend = function(){
    $('.username').on('click', function(event) {
      //console.log("I've been clicked");
      var username = event.target.innerText;
      //console.log('Username: ' + username);
      $('.username').each(function(){
        //console.log("this.innertext: " + this.innerText);

        if(this.innerText === username){
          $(this).toggleClass("friend");
        }
      })
    })
  };

});



//update roomss with set timeout
//append rooms to div

//create input button for adding new room
//write event handler for button
  //update div for new rooms
//grab the room from each incoming message
//filter messages by room


//put username in a tags
//create click handler for usernames as they are generated
//click handler toggles friend class
  //use inner text to grab username
//style friend class


