import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  const sign = req.headers["X-Hub-Signature-256"];

  console.log(`sign: ${sign}`);
  next();
});

router.get("/", (req, res) => {
  console.log(req);
  res.send("ping");
});

router.post("/", (req, res) => {
  console.log(req);
  res.send("pong");
});

module.exports = router;
