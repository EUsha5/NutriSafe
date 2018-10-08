const express        = require('express');
const router     = express.Router();
const passport       = require('passport');
const bcrypt         = require('bcryptjs');
const User           = require('../../models/User');

router.post('/signup', (req, res, next) => {
  if(!req.body.username || !req.body.password){
    res.status(400).json({message: 'Identify yourself, with a Username and Password'});
    return;
  }

  if(req.body.password.length < 8){
    res.status(400).json({message: 'Please enter an 8 digit password'});
}

User.findOne({
  email: req.body.email, 
  username: req.body.username})
  .then((userFromDb) => {
    if(userFromDb !== null){
      res.status(400).json({ message: 'Username/Email is taken. Please enter valid Email/Username.' });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    const aNewUser = new User({
        username:  req.body.username,
        password:  hashPass,
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        email:     req.body.email,
    });
    console.log('-------Creating User-------', aNewUser);    
    User.create(aNewUser);
    return;
  })
  .then((userResponseFromDb) => {
    console.log('==========Response=======', userResponseFromDb);
    res.json(userResponseFromDb)
  })
  .catch((err) => {
    next(err);
  })
  .catch((err) => {
    next(err);
  })
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
        res.status(500).json({ message: 'Something went wrong authenticating user' });
        return;
    }

    if (!theUser) {
        // "failureDetails" contains the error messages
        // from our logic in "LocalStrategy" { message: '...' }.
        res.status(401).json(failureDetails);
        return;
    }

    // save user in session
    req.login(theUser, (err) => {
        if (err) {
            res.status(500).json({ message: 'Session save went bad.' });
            return;
        }

        // We are now logged in (that's why we can also send req.user)
        res.status(200).json(theUser);
    });
})(req, res, next);
  // User.findOne({username: req.body.username})
  // .then((userFromDb) => {
  //   console.log('++++++++++User++++++++', userFromDb);
  //   if(userFromDb === null){
  //     res.json({message: 'That is not your name. Try again!'});
  //     return;
  //   }
  //   const isPasswordGood =
  //     bcrypt.compareSync(req.body.password, userFromDb.password);
    
  //     if(isPasswordGood === false){
  //       res.json({message: 'That is not your password. Try Again!'});
  //       return;
  //     }
  //     req.login(userFromDb, (err) => {
  //       if(err) {
  //         next(err);
  //       }
  //       else {
  //         console.log("user" + userFromDb);
  //         userFromDb.set({loggedIn: true});
  //         userFromDb.save()
  //         .then(() => {
  //           res.json(req.user);
  //         })
  //         .catch((err) => {
  //           next(err);
  //         });

  //   }
  //     });
  // })
  // .catch((err) => {
  //   next(err);
  // });
});

router.post('/logout', (req, res, next) => {
  console.log("this is the user before the log out ============= ", req.user);
  if(req.user === undefined) {
    return;
  }
  req.user.set({loggedIn: false});
  req.user.save()
  .then(() => {
    req.logout();
    req.session.destroy();
    console.log("the user info after the log out {}{}}{}{}{{{}{}}{}{}}{{}{}{{}{}} ", req.user);
  })
    res.status(200).json({message: 'Logged out successfully!'});
});

router.get('/loggedin', (req, res, next) => {
  console.log("the user info when checking if logged in !!!!!!!!!!!!!!!!!!!!!!!!", req.user);
  if(req.isAuthenticated()){
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({message: 'Unauthorized!'})
})

module.exports = router;