import { Response, Request } from "express";
import { Github } from "../../lib";
import { Workflow } from "../../lib/github/workflow";
import { WorkflowRun } from "../../lib/github/workflow_run";

interface Payload extends Github.Payload {
  action: "completed" | "requested" | "in_progress";
  workflow: Workflow;
  workflow_run: WorkflowRun;
}

export function workflow_run(req: Request, res: Response) {
  const body = req.body as Payload;

  console.log(`workflow_run: ${body.workflow.name} ${body.action}`);
  res.send("ok");
}
