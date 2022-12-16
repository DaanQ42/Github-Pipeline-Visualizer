export interface WorkflowJob {
  conclusion: string;
  id: string;
  labels: string[];
  name: string;
  repository: string;
  status: "queued" | "in_progress" | "completed";
  steps: WorkflowJobStep[];
}

export interface WorkflowJobStep {
  completed_at: string;
  conclusion: string;
  name: string;
  number: number;
  started_at: string;
  status: "queued" | "in_progress" | "completed";
}
