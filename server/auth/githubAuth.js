const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.send(`
  <h1>Welcome</h1>
  <a href="/auth/githubAuth/login/github"> Login With Github </a>
  `);
});

router.get("/login/github", (req, res) => {
  const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  res.redirect(githubURL);
});

router.get("/login/github/callback", async (req, res) => {
  const code = req.query.code;

  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: code,
  };
  const opts = { headers: { accept: "application/json " } };

  const response = await axios.post(`https://github.com/login/oauth/access_token`, body, opts);

  const token = response.data.access_token;

  res.redirect(`/?token=${token}`);
});

module.exports = router;