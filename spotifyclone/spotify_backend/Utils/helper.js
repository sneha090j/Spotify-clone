const jwt=require("jsonwebtoken");
exports={};

exports.getToken=async(email,user)=>{
    const token=jwt.sign({identifier:user.id},"Thisissettobesecret");
    return token;

};
module.exports=exports;