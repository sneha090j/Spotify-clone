const mongoose=require("mongoose");
// how to create a model-
// 1. require mongoose
// 2.create mongoose schema
// 3.create model

const User=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:false,

    },
    email:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    likedSongs: {
        type:String,
        default:"",
    },
    likedPlaylists:{
        type:String,
        default:""
    },
});
const UserModel=mongoose.model("User",User);
module.exports=UserModel;