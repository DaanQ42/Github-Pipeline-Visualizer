import express from "express";

import * as webhooks from "./webhooks/index";

const router = express.Router();

router.use((req, res, next) => {
  const sign = req.get("X-Hub-Signature-256");

  console.log(`sign: ${sign}`);
  next();
});

router.post("/", (req, res) => {
  webhooks.Webhooks.post(req.get("x-github-event"), req, res);
});

module.exports = router;
