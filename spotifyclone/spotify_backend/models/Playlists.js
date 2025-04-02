const mongoose=require("mongoose");
const Playlists=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"song",
        }
    ],
    collaborators:[
        {
            type:mongoose.Types.ObjectId,
            ref:"user"
         }
    ],
});
const PlaylistsModel=mongoose.model("Playlists",Playlists);
module.expots=PlaylistsModel;