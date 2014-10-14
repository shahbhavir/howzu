module.exports = function(app) {

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/' + 'index.html');
  });

  app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/public/' + 'signup.html');
  });

  app.get('/logout', function(req, res){
    res.redirect('/');
  });

};