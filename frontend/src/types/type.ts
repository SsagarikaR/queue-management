export interface Job {
  id: number;
  jobType: string;
  status: string;
  progress: number;
  createdAt: string;
}

export interface Logs {
  id: number;
  description: string;
  createdAt: string;
}
