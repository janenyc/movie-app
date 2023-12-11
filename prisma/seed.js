const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPeople = async () => {
  console.log("Creating People...");
  await prisma.person.create({
    data: {
      name: "Kevin Bacon",
    },
  });

  await prisma.person.createMany({
    data: [
      { name: "Emilio Estevez" },
      { name: "Adam Sandler" },
      { name: "Nicolas Cage" },
      { name: "Jason Statham " },
      { name: "Christopher Walken" },
      { name: "Tom Cruise" },
    ],
  });
};

const createRatings = async () => {
  console.log("Creating Ratings...");

  await prisma.rating.createMany({
    data: [
      { name: "G" },
      { name: "PG" },
      { name: "PG-13" },
      { name: "R" },
      { name: "NC-17" },
    ],
  });
};

const createMovies = async () => {
  console.log("Creating movies...");

  //Find the R rating
  const rating_R = await prisma.rating.findFirst({
    where: {
      name: "R",
    },
  });

  const kevinBacon = await prisma.person.findFirst({
    where: {
      name: "Kevin Bacon",
    },
  });

  const walken = await prisma.person.findFirst({
    where: {
      name: "Christopher Walken",
    },
  });

  console.log("R Rating", rating_R);

  await prisma.movie.create({
    data: {
      title: "Human Worm Man 4",
      genre: "Horror",
      release_year: 2001,
      rating: { connect: rating_R },
      director: {
        create: {
          name: "Stephen Speilberg",
        },
      },
      actors: {
        connect: [
          kevinBacon,
          walken
        ],
      },
    },
  });
};

const main = async () => {
  console.log("Seeding the database....");
  await createPeople();
  await createRatings();
  await createMovies();
};

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Done");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });