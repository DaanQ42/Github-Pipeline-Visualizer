import { Response, Request } from "express";
import { Github } from "../../lib";
import { Repository } from "../../lib/github/repository";

interface Payload extends Github.Payload {
  inputs: Record<string, any>;
  ref: string;
  repository: Repository;
  workflow: string;
}

export function workflow_dispatch(req: Request, res: Response) {
  const body = req.body as Payload;
  res.send("ok");

  console.log(`Received workflow_dispatch ${body.workflow} event`);
}
