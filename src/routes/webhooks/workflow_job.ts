import { Response, Request } from "express";
import { JobData } from "../../data/data";
import { Github } from "../../lib";
import { WorkflowJob } from "../../lib/github/workflow_job";

interface Payload extends Github.Payload {
  action: "queued" | "in_progress" | "completed";
  workflow_job: WorkflowJob;
}

export function workflow_job(req: Request, res: Response) {
  const body = req.body as Payload;
  const job = body.workflow_job;

  if (job) {
    JobData.update(job);
  }
  res.send("ok");
}
