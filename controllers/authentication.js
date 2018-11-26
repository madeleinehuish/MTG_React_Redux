const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  console.log('configsecret:', config.SECRET);

  if(process.env.NODE_ENV === 'production') {
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
  } else {
    const config = require('../config');
    return jwt.encode({ sub: user.id, iat: timestamp }, config.SECRET);
  }
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const user = {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email
  };

  // console.log('user in signin: ', req.user);
  res.send({ token: tokenForUser(req.user), user: user });
}

exports.signup = function(req, res, next) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });

    const userSanitized = {
      firstname: firstname,
      lastname: lastname,
      email: email
    }

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user), user: userSanitized });
    });
  });
}
