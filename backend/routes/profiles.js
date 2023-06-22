const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");

router.get("/:user/profiles", async function(req, res){
    let query = {username: req.params.user};
    const usuario = await User.findOne(query, "_id");
    const perfiles = await Profile.find({ user: usuario._id });

    if(!perfiles)
        return res.status(400)
    return res.json(perfiles);
});

router.delete("/:user/:profiles", async function(req, res){
    const username = req.params.user;
    const profile = req.params.profiles;
  
    const user = await User.findOne({ username: username });
  
    const deleteResult = await Profile.deleteOne({ name: profile, user: user._id });
  
    return res.json(deleteResult);
});

//quitar
router.put("/:user/profiles/change", async function(req, res){

    const username = req.params.user;
    
    const updateResult = await User.updateOne({username: username}, req.body); 
    
    return res.json(updateResult);

});
  

module.exports = router;
