import express from "express";
const router = express.Router();

const apiRouter = require("./api");
const webhookRouter = require("./webhook");
const websocketRouter = require("./websocket");

router.use("/api", apiRouter);
router.use("/webhook", webhookRouter);
router.use("/websocket", websocketRouter);

module.exports = router;
