const express=require("express");
const router=express.Router();
const passport=require("passport");
const Song=require("../models/Song");
const user=require("../models/User");
router.post("/create",passport.authenticate("jwt",{session:false}), async (req,res)=>{
//passport.authenticate is a middleware
const {name,thumbnail,track}=req.body;

if(!name || !thumbnail||!track){
    return res
    .status(301)
    .json({err:"Insufficient deatils to create song."});
}
const artist=req.user._id;
const songDetails={name,thumbnail,track,artist};
const createdSong=await Song.create(songDetails);
return res.status(200).json(createdSong);
});

// get route to get all song
router.get("/get/mysongs",passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const currentUser=req.user;
    const songs=await Song.find({artist:req.user._id});
    return res
    .status(200)
    .json({data:songs});
});

// get route to get all songs any artist has published
// i will send the artist is and i want to see all songs that artist has published

router.get("/get/artist",passport.authenticate("jwt",{session:false}),
async(req,res)=>{
    const {artistId}=req.body;
    const artist=await User.find({_id:artistId});
    if(!artist){
        return res.status(301).json({err:"Artist does not exist"});
    }
    const songs=await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
}
);


// finding song by name
router.get("/get/songname",passport.authenticate("jwt",{session:false}),
async(req,res)=>{
    const {songName}=req.body;
    const songs=await Song.find({name:songName});
    return res.status(200).json({data:songs});


});

module.exports=router;