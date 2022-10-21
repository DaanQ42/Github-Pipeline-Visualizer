import { Organization } from "./organization";
import { Repository } from "./repository";
import { Sender } from "./sender";

export interface WorkflowJob {
  conclusion: string | null;
  id: number;
  labels: string[];
  name: string;
  organization: Organization;
  repository: Repository;
  runner_group_id: number;
  runner_group_name: string;
  runner_id: number;
  runner_name: string;
  sender: Sender;
  steps: WorkflowJobStep[];
  [property: string]: any;
}

export interface WorkflowJobStep {
  name: string;
  status: "queued" | "in_progress" | "completed";
  conclusion: string | null;
  number: number;
  started_at: "2022-10-21T13:07:28.000Z";
  completed_at: "2022-10-21T13:07:29.000Z";
}
