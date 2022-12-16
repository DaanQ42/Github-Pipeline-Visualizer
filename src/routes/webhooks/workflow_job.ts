import { Response, Request } from "express";
import { Github } from "../../lib";
import { WorkflowJob } from "../../lib/github/workflow_job";
import { Identify } from "../../lib/uniform/ids";
import * as uniform from "../../lib/uniform/WorkflowJob";
import { SendWorkflow } from "../../websockets/server";

interface Payload extends Github.Payload {
  action: "queued" | "in_progress" | "completed";
  workflow_job: WorkflowJob;
}

export function workflow_job(req: Request, res: Response) {
  const { workflow_job } = req.body as Payload;
  res.send("ok");

  console.log("repo", workflow_job);

  //Strip any data and unwanted properties
  const result: uniform.WorkflowJob = {
    id: Identify.obfuscate(workflow_job.id),
    name: workflow_job.name,
    conclusion: workflow_job.conclusion || "",
    status: workflow_job.status,
    labels: workflow_job.labels,
    repository: workflow_job.repository?.name ?? "",
    steps: workflow_job.steps.map((step) => {
      return {
        name: step.name,
        status: step.status,
        conclusion: step.conclusion || "",
        number: step.number,
        started_at: step.started_at,
        completed_at: step.completed_at,
      };
    }),
  };

  SendWorkflow(result);
}
