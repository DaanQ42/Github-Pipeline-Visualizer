import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  const sign = req.get("X-Hub-Signature-256");

  console.log(`sign: ${sign}`);
  next();
});

router.get("/", (req, res) => {
  const payload = req.body;
  console.log(payload);

  res.send("ping");
});

router.post("/", (req, res) => {
  const payload = req.body;
  console.log(payload);

  res.send("pong");
});

module.exports = router;
