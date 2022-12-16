import { Response, Request } from "express";
import { Github } from "../../lib";
import { Workflow } from "../../lib/github/workflow";
import { WorkflowRun } from "../../lib/github/workflow_run";

interface Payload extends Github.Payload {
  action: "completed" | "requested" | "in_progress";
  workflow: Workflow;
  workflow_run: WorkflowRun;
}

/**
 *
 * @see https://docs.github.com/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_run
 * @param req
 * @param res
 */
export function workflow_run(req: Request, res: Response) {
  const body = req.body as Payload;
  res.send("ok");

  console.log(`Received workflow_run ${body.action} event`, body);
}
