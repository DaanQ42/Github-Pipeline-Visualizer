import express from "express";
import { JobData } from "../../data/data";
const router = express.Router();

router.get("/job", (req, res) => {
  const id = req.query.id;

  if (id === undefined) {
    res.status(400).send("Missing id parameter");
    return;
  }

  if (typeof id === "string") {
    res.send(JobData.get(parseInt(id)));
    return;
  }

  res.sendStatus(400).send(`Invalid id parameter: ${id}`);
});

module.exports = router;
