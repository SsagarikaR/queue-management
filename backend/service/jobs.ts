import {
  createJobs,
  fetchJobByType,
  fetchJobs,
  removeJobs,
  updateJobs,
} from "../repository/jobs";
import { Job } from "../types/type";
import { JOB } from "../utils/constants";
import { CustomErrror } from "../utils/customError";

export const createJob = async (
  jobType: string,
  status: string,
  progress: number,
  logs: string
): Promise<Job> => {
  if (!jobType || !status || !progress || !logs) {
    throw new CustomErrror(JOB.MISSING_FIELD, 400);
  }
  const jobExist = await fetchJobByType(jobType);
  if (jobExist) {
    throw new CustomErrror(JOB.ALREADY_EXIST, 400);
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

export const getJob = async (
  searchKey?: string,
  searchData?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  if ((searchKey && !searchData) || (!searchKey && searchData)) {
    throw new CustomErrror(JOB.MISSING_SEARCH_QUERY, 400);
  }

  const job = fetchJobs(searchKey, searchData, page, pageSize);
  return job;
};

export const removeJob = async (id: number) => {
  const job = removeJobs(id);
  return job;
};
