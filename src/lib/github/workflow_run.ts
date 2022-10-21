import { Repository } from "./repository";

export interface WorkflowRun {
  conclusion: string | null;
  head_repository: Repository;
  id: number;
  name: string;
  repository: Repository;
  run_attempt: number;
  run_number: number;
  run_started_at: string;
  status: string;

  [property: string]: any;
}
