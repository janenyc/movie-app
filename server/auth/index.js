const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const saltRounds = 10;

router.use("/githubAuth", require("./githubAuth"));

//add user to the database
router.post("/register", async (req, res) => {
  const unhashed = req.body.password;

  console.log("Unhashed: ", unhashed);

  const hashed = await bcrypt.hash(unhashed, saltRounds);

  console.log("Hashed: ", hashed);

  try {
    const result = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashed,
      },
    });

    const token = jwt.sign({ id: result.id }, process.env.SECRET);

    res.send(token);
  } catch (error) {
    res.send(error);
  }
});

//check if user is in database and if passwords match
router.post("/login", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (user) {
    const bodyPassword = req.body.password;

    const isAMatch = await bcrypt.compare(bodyPassword, user.password);

    if (isAMatch) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET);

      res.send(token);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
