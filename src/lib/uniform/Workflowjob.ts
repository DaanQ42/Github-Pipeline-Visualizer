export interface WorkflowJob {
  conclusion: string | null;
  id: string;
  steps: WorkflowJobStep[];
  labels: string[];
}

export interface WorkflowJobStep {
  id: string;
  status: "queued" | "in_progress" | "completed";
  conclusion: string | null;
  number: number;
  started_at: string;
  completed_at: string;
}

export namespace WorkflowJob {}
