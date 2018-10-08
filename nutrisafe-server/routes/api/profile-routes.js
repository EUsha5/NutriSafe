const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const User        = require("../../models/User");
const RecipeBook = require('../../models/RecipeBook');

//===========User Profile Routes==================

// GET route => to get user profile
router.get('/profile', (req, res, next) => {
  User.findById(req.user._id)
  .then((profile) => {
      res.json(profile); 
  })
  RecipeBook.find({_id: profile.recipebook})
  .then((response) =>{
    data = {
      profile: profile,
      recipebook: response,
      // editable: editable
    }
    res.json(data)
  })
  .catch((err) => {
    next(err);
  })
  .catch((err) => {
    res.json(err);
  })
});



//==========Recipe Book Routes====================

//view a specific book-----------------------------
router.get('/profile/book/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }                                   
  RecipeBook.findById(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});



// router.get('/profile/book/edit/:id', (req, res, next) => {
//   RecipeBook.findById(req.params.id)
// .then((aBook) => {
//     res.json(aBook);
//   })
//   .catch((err) => {
//     next(err)
//   });
// })

// Update a specific book---------------------------
router.put('/profile/book/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  RecipeBook.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({message: `Recipe Book with ${req.params.id} is updated successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
});

//create a recipe book---------------------
router.post('/profile/book/create', (req, res, next) => {
  RecipeBook.create({
    title:  req.body.title,
    author: req.user._id,
  })
  .then (response => {
    console.log('???????????????', response);
    res.json(response);
    console.log(response);
  })
  .catch(err => {
    res.json(err);
  })
});

//delete recipe----------------------------------------
router.delete('/profile/book/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  RecipeBook.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({message: `Recipe Book with ${req.params.id} is removed successfully.`});
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router;