import {
  createJobs,
  fetchJobByType,
  fetchJobs,
  removeJobs,
  updateJobs,
} from "../repository/jobs";
import { Job } from "../types/type";
import { CustomErrror } from "../utils/customError";

export const createJob = async (
  jobType: string,
  status: string,
  progress: number,
  logs: string
): Promise<Job> => {
  const jobExist = await fetchJobByType(jobType);
  if (jobExist) {
    throw new CustomErrror(
      "this job already exist please check the stautus and retry if its pending",
      400
    );
  }
  const job = await createJobs(jobType, status, progress, logs);

  return job;
};

export const updateJob = async (
  id: number,
  data: {
    jobType?: string;
    status?: string;
    progress?: number;
    logs?: string;
  }
) => {
  const job = updateJobs(id, data);
  return job;
};

export const getJob = async (searchKey?: string, searchData?: string) => {
  const job = fetchJobs(searchKey, searchData);
  return job;
};

export const removeJob = async (id: number) => {
  const job = removeJobs(id);
  return job;
};
