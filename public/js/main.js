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
        $('#loginBox').addClass('hidden');
        $('#signupBox').addClass('hidden');
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
    if ( !$('#newUser').val() ) return;

    xhr = $.ajax({
      url: '/signup',
      type: 'POST',
      dataType: 'json',
      data: {
        name: $('#newUser').val()
      }
    })
    .done(function( data, textStatus, jqXHR ) {
      if (data.value==='Y') {
        $('#loginBox').after(data.msg || 'Login now with these credentials.');
        $('#signupBox').addClass('hidden');
      } else {
        $('#signupBox').after(data.msg || 'Invalid username');
      }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      $('#signupBox').after('Error occured! Please try again.');
    });
  };

  var onMsgSubmit = function(){
    if ( !$('#m').val() ) return;

    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  };

  $('form').submit(onMsgSubmit);

  socket.on('user_connected', function(name, msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('chat message', function(name, msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('disconnect', function(name, msg){
    $('#messages').append($('<li>').text(msg));
  });

  $('#loginBtn').click(onLogin);
  $('#signupBtn').click(onSignup);

});