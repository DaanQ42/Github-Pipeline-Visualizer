import { Response, Request } from "express";

export function ping(req: Request, res: Response) {
  console.log(JSON.stringify(req.params));
  console.log(JSON.stringify(req.body));

  res.send("pong");
}
