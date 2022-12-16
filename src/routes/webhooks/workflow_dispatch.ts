import { Response, Request } from "express";
import { Github } from "../../lib";
import { Repository } from "../../lib/github/repository";
import { Identify } from "../../lib/uniform/ids";
import * as uniform from "../../lib/uniform/WorkflowJob";

interface Payload extends Github.Payload {
  inputs: Record<string, any>;
  ref: string;
  repository: Repository;
  workflow: string;
}

export function workflow_dispatch(req: Request, res: Response) {
  const body = req.body as Payload;
  res.send("ok");

  console.log(`Received workflow_dispatch ${body.workflow} event`, body);
}
