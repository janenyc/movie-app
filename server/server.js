const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
require('dotenv').config()
const app = express();
const morgan = require("morgan")
const port = 3000;
const jwt = require("jsonwebtoken");

const path = require("path")

app.use(morgan("dev"))

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "client/dist")))


//Check the headers for autorization tokens
app.use((req,res,next)=>{
  const auth = req.headers.authorization

const token = auth?.startsWith("Bearer") ? auth.slice(7) : null
//console.log(req.headers)
try{
req.user = jwt.verify(token, process.env.SECRET)
}
catch(error){
  req.user = null
}
//log the current user
console.log("USER: ", req.user)
next();
})
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});