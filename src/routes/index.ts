import express from "express";
const router = express.Router();

const webhookRouter = require("./webhook");
const pagesRouter = require("./pages");
const apiRouter = require("./api");

router.use("/webhook", webhookRouter);
router.use("/page", pagesRouter);

module.exports = router;
