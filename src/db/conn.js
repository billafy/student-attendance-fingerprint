const mongoose  = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Student_profile",{
    useNewUrlParser:true,

}).then(()=>{
    console.log(`connection successfull`); 
}).catch((e)=>{
    console.log(`no connection`); 
})