import { Organization } from "./organization";
import { Repository } from "./repository";
import { Sender } from "./sender";

export interface WorkflowJob {
  conclusion: string | null;
  labels: string[];
  organization: Organization;
  repository: Repository;
  runner_group_id: number;
  runner_group_name: string;
  runner_id: number;
  runner_name: string;
  sender: Sender;
  status: "queued" | "in_progress" | "completed" | null;
  [property: string]: any;
}
