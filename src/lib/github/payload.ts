import { Sender } from "./sender";

export interface Payload {
  organization?: Record<string, any>;
  repository?: Record<string, any>;
  sender?: Sender;
}
