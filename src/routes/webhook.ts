import express from "express";

import * as webhooks from "./webhooks/index";

const router = express.Router();

router.use((req, res, next) => {
  const sign = req.get("X-Hub-Signature-256");

  if (sign && sign.length > 0) {
    next();
  } else {
    res.status(400).send("Bad Request");
  }
});

router.post("/", (req, res) => {
  webhooks.Webhooks.post(req.get("x-github-event"), req, res);
});

module.exports = router;
