var User = require('./../app/models/User').User,
    newUser;

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isUserExists = function (req, res, next) {
  User.findOne({ name: req.body.username }, function(err, doc){
    if (err) return false;
    if (doc) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = function(app) {

  app.post('/login', function(req, res){
    if (!req.body) return res.sendStatus(400);
    User.findOne({ name: req.body.name }, function(err, doc){
      if (err) res.end('Error');
      if (!doc) {
        res.json({'value': 'N', 'msg': 'Username does not exist'});
      }
      if (doc) {
        res.json({'value': 'Y', 'msg': 'Login successful'});
      }
    });
  });

  app.post('/signup', function(req, res, next){
    if (!req.body) return res.sendStatus(400);

    if (isUserExists(req, res, next)) {
      res.end({'value': 'N', 'msg': 'Username exists'});
    } else {
      newUser = new User({name: req.body.name});
      newUser.save(function(err, doc){
        if (err) res.end('Error');
        if (!doc) res.end('Not found');
        if (doc) res.json({'value': 'Y', 'msg': 'User created. Now login to the app'});
      });
    }
  });

  app.get('/users', function(req, res){
    User.find({}, function(err, doc){
      if (err) res.end('Not found');
      if ( !(doc instanceof Object) ) doc = [doc];
      res.json(doc);
    });
  });

  app.get('/user/:id', function(req, res){
    if (!req.body) return res.sendStatus(400);
    User.findOne({ name: req.params.username }, function(err, doc){
      if (err) res.end('Not found');
      doc.speak();
      res.json(doc);
    });
  });

};