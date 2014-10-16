$(function function_name () {
  // body...
  var socket = io();

  var onLogin = function(e){
    var xhr;
    /* Act on the event */
    if ( !$('#username').val() ) return;

    xhr = $.ajax({
      url: '/login',
      type: 'POST',
      dataType: 'json',
      data: {
        name: $('#username').val()
      }
    })
    .done(function( data, textStatus, jqXHR ) {
      if (data.value==='Y') {
        socket.emit('user_connected', $('#username').val());
        $('#loginDiv').addClass('hidden');
        $('#chatBox').removeClass('hidden');
      } else {
        $('#loginBox').after(data.msg || 'Invalid username');
      }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      $('#loginBox').after('Error occured! Please try again.');
    });
  };

  var onSignup = function(e){
    var xhr;
    /* Act on the event */
    if ( !$('#upName').val() ) return;

    xhr = $.ajax({
      url: '/signup',
      type: 'POST',
      dataType: 'json',
      data: {
        name: $('#upName').val()
      }
    })
    .done(function( data, textStatus, jqXHR ) {
      if (data.value==='Y') {
        $('#signupBox').after(data.msg || 'Login now with these credentials.');
      } else {
        $('#signupBox').after(data.msg || 'Invalid username');
      }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      $('#signupBox').after('Error occured! Please try again.');
    });
  };

  var onMsgSubmit = function(){
    if ( !$('#msg').val() ) return;

    socket.emit('chat message', $('#msg').val());
    $('#msg').val('');
    return false;
  };

  socket.on('user_connected', function(name, msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('chat message', function(name, msg){
    $('#messages').append($('<li>').text(msg));
    $('#messages').animate({
      scrollTop: $('#messages').height()
    }, 500);
  });

  socket.on('disconnect', function(name, msg){
    $('#messages').append($('<li>').text(msg));
  });

  $('#signinForm').submit(onLogin);
  $('#signupForm').submit(onSignup);
  $('#chatMsgForm').submit(onMsgSubmit);

});