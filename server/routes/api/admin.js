const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


const Pushlevel = require("../../models/Pushlevel");
const Perfomance = require("../../models/Performance");

router.post("/push", async (req, res) => {
    const { names, difficulty, url } = req.body;
    // console.log("lvl: " + lvl + '\n' + "difficulty: " + difficulty + '\n' + "url: " + url + '\n');
    
    if (names === "" || difficulty === "" || url === "") {
      return res.status(404).json({ status: "Please enter the details properly..." });
    }
    else {
      const cnt = await Pushlevel.find({});
      const len = cnt.length;
      // console.log(len);
      
      const newLevel = new Pushlevel({
        level: len+1,
        name: names,
        difficulty: difficulty,
        url: url
      });
  
      newLevel
        .save()
        .then(level => res.json({status: "Level pushed successfully..."}))
        .catch(err => console.log(err));
    }
  })

  router.get('/getAllData', async(req, res)=>{
    const data = await Performance.find({}).sort({levelsDone: -1});
    res.json(data);
  })

  module.exports = router;