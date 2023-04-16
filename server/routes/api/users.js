const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Perfomance = require("../../models/Performance");
const Pushlevel = require("../../models/Pushlevel");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ $or:
    [{name: req.body.name}, {email: req.body.email}]}).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email or userName already exists"});
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const newInfo = new Perfomance({
        name: req.body.name,
        time: 0,
        levelsDone: 0
      });
      newInfo
            .save()
            .then(user => {})
            .catch(err => console.log(err));
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
      
      

    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email //changes
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post('/getUser', async(req, res)=>{
  const data = await Perfomance.find({});
  // console.log(data);
  res.send(data);
});


router.post('/getUserInfo', async(req, res)=>{
  const {user} = req.body;
  // console.log(user);
  const data = await Perfomance.find({name: user});
  // console.log(data);
  const lastlvl = data[0].levelsDone + 1;
  // console.log(typeof(lastlvl));
  const dataFromPushLvl = await Pushlevel.find({level: lastlvl});
  // console.log(dataFromPushLvl[0].url);
  const imgurl = dataFromPushLvl[0].url;
  // const imgurl = "";
  res.send(imgurl);
});

router.post('/gusrinfo', async(req, res)=>{
  const {user} = req.body;
  const data = await Perfomance.find({name: user});
  res.send({level:data[0].levelsDone, time:data[0].time});
})

router.put('/levelCleared', async (req, res)=>{
  const {user, time} = req.body;
  // const
  // console.log(user);
  
  const data = await Perfomance.find({name: user});
  // console.log(time);
  const lastlvl = data[0].levelsDone + 1;
  const lasttime = data[0].time + time;
  const upData = await Performance.updateOne({name: user}, {
    $set: {
      levelsDone: lastlvl,
      time: lasttime
    }
  });
  // console.log(upData);
  res.json({result:"updated"});

});

module.exports = router;
