const router = require("express").Router()

router.get("/", (req,res)=>{
    res.send("welcome to the movie routes")
})



module.exports = router