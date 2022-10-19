const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partial_path = path.join(__dirname, "../templates/partials" );
const faculty_path = path.join(__dirname,"../templates/faculty");

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

app.get("/",(require,res)=>{
    res.render('index') 
})
app.get("/register",(require,res)=>{
    res.render('register') 
})
app.get("/admin",(require,res)=>{
    res.render('admin') 
})

app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`) 
});