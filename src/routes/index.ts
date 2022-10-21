import express from "express";
const router = express.Router();

const webhookRouter = require("./webhook");
const apiRouter = require("./api");

router.use("/webhook", webhookRouter);
router.use("/api", apiRouter);

module.exports = router;
