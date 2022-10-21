import { Response, Request } from "express";
import { Github } from "../../lib";

interface Payload extends Github.Payload {
  action: "completed" | "requested" | "in_progress";
  workflow: Record<string, any>;
  workflow_run: Record<string, any>;
}

export function workflow_run(req: Request, res: Response) {
  const body = req.body as Payload;

  console.log(`workflow_run: ${body.action}`);
}
