import { Response, Request } from "express";
import { ping } from "./ping";
import { workflow_dispatch } from "./workflow_dispatch";
import { workflow_job } from "./workflow_job";
import { workflow_run } from "./workflow_run";

type WebhookEvent = (req: Request, response: Response) => void;
type WebhookEvents = Record<string, WebhookEvent>;
type MethodMap = Record<string, WebhookEvents>;

const map: MethodMap = {
  post: {
    ping: ping,
    workflow_dispatch: workflow_dispatch,
    workflow_job: workflow_job,
    workflow_run: workflow_run,
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
      console.log("Unknown event", event);
      //Just accept it and send
      res.send("ok");
    }
  }
}
