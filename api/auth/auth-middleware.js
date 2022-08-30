const User = require('../users/users-model');



/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
// try {
//   if(!req.session.user) {
//     res.status(401).json({message: "You shall not pass!"})
//   }
// } catch (error) {
  
// }


  console.log('restricted middleware');



}






/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
try {
  const users = await User.findBy({username: req.body.username})
  if(!users.length) {
    next()
  }
  else next({message: "Username taken"})
} catch (err) {
  next(err)
}

}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/

// || username != req.params.username
function checkUsernameExists(req, res, next) {
  try {
    const { username } = req.body;
    if(!username ){
      res.status(401).json({message: "Invalid credentials"})
    }
  } catch (error) {
    res.json(error)
  }
next();
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  try {
    const { password } = req.body;
    if(!password || password.length <= 3){
      res.status(422).json({message: "Password must be longer than 3 chars"})
    }
  } catch (error) {
    
  }
next()
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted, 
  checkUsernameExists,
  checkUsernameFree,
  checkPasswordLength,
}