// npm init : package.json -- This is node project
// npm i express : expressjs package install ho gye -- project came to know we are using express


const express=require("express");

const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const port=8001;
const passport=require("passport");
const User=require("./models/User");
const authRoutes=require("./routes/auth");
const songRoutes=require("./routes/Song");
const playlistRoutes=require("./routes/playlist");
app.use(express.json());








// console.log(process.env);
// connect mongodb to node app
// mongoose.connect() takes 2 arguments : 1. which db to connect to db url
mongoose.connect("mongodb+srv://sneha090j:"+process.env.MONGO_PASSWORD+"@cluster0.enlwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
     {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
   // {
   //    serverSelectionTimeoutMS: 5000, 
   // }
   )

    .then((x)=>{
        console.log("connectd to mongo!");
    })
    .catch((err)=>{
        console.log("Error "+err);
    });

    // setup passport-jwt
   const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Thisissettobesecret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ id: jwt_payload.id });
        return user ? done(null, user) : done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );

 // API : get Type:/return text
 app.get("/",(req,res)=>{
    //req contains all data for the request
    // res contains all data for teh response
    res.send("hello world");
 });
app.use("/auth",authRoutes);
 //now we want to tell express that our server will run on localhost:8000
// for songs
app.use("/song",songRoutes);

app.use("/playlist",playlistRoutes);
 app.listen(port,()=>{
    console.log("App is running on port +"+port);
 });


