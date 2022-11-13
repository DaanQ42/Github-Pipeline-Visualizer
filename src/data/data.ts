import { WorkflowJob } from "../lib/github/workflow_job";

export namespace JobData {
  const data: Record<number, WorkflowJob> = {};

  export function update(job: WorkflowJob): void {
    data[job.id] = job;
  }

  export function get(id: number): WorkflowJob {
    return data[id] || { id: id, conclusion: "missing" };
  }

  export function forEach(cb: (job: WorkflowJob) => void): void {
    Object.entries(data).forEach(([_, job]) => cb(job));
  }
}
