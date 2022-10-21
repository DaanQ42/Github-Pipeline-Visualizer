import { WorkflowJob } from "../lib/github/workflow_job";

export namespace JobData {
  const data: Record<number, WorkflowJob> = {};

  export function update(job: WorkflowJob): void {
    data[job.id] = job;
  }
}
