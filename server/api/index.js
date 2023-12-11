const router = require("express").Router()

router.use("/person", require("./person"))
router.use("/movie", require("./movie"))

module.exports = router