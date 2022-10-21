import express from "express";
const router = express.Router();

router.get("/simple", (req, res) => {
  res.sendFile(__dirname, "simple.html");
});

module.exports = router;
