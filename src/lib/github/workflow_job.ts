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
  started_at: string;
  completed_at: string;
}
