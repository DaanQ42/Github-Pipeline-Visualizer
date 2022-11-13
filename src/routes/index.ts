import express from "express";
const router = express.Router();

const apiRouter = require("./api");
const webhookRouter = require("./webhook");

router.use("/api", apiRouter);
router.use("/webhook", webhookRouter);

module.exports = router;
