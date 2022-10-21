import { Response, Request } from "express";
import { ping } from "./ping";

type WebhookEvent = (req: Request, response: Response) => void;
type WebhookEvents = Record<string, WebhookEvent>;
type MethodMap = Record<string, WebhookEvents>;

const map: MethodMap = {
  post: {
    ping: ping,
  },
};

export namespace Webhooks {
  /**
   *
   * @param event
   * @param req
   * @param res
   */
  export function post(event: string | undefined, req: Request, res: Response) {
    if (event === undefined) {
      res.status(400).send("No event specified");
      return;
    }

    const handler = map.post[event];

    if (handler) {
      handler(req, res);
    } else {
      //Just accept it and send
      res.send("ok");
    }
  }
}
