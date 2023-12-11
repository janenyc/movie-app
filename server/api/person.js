const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

//
//Get and return all the person from the person table in the db
router.get("/", async (req, res) => {
    const persons = await prisma.person.findMany();

    res.send(persons);
});

//Gets and return a specified person
router.get("/:id", async (req, res) => {
    const personId = parseInt(req.params.id);
    const person = await prisma.person.findUnique({
        where: {id: personId},
    });

    res.send(person || {});
});

//Post Create a new person in db
//ROUTE: "/api/person/"
//Only create a new person if request has a valid token
router.post("/", async (req, res) => {
    const newPerson = req.body;

console.log("USER IS LOGGED IN" , req.user)

if(!req.user){
res.sendStatus(401)

}
else{

    try {
        const result = await prisma.person.create({data: newPerson});
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
}
});

module.exports = router;
