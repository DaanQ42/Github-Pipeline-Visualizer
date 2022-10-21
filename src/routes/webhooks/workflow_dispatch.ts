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

  console.log(`workflow_dispatch: ${body.repository.name} with: ${JSON.stringify(body.inputs)}`);
  res.send("ok");
}
