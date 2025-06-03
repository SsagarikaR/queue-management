import {
  createLogs,
  fetchLogByJobId,
  fetchLogs,
  removeLogs,
  updateLogs,
} from "../repository/logs";

export const createLog = async (description: string, jobId: number) => {
  const log = await createLogs(description, jobId);
  return log;
};

export const updateLog = async (
  id: number,
  data: {
    description?: string;
    jobId?: number;
  }
) => {
  const log = updateLogs(id, data);
  return log;
};

export const getLog = async (id?: number) => {
  const log = fetchLogs(id);
  return log;
};

export const removeLog = async (id: number) => {
  const log = removeLogs(id);
  return log;
};

export const getLogsByJobId = async (jobId: number) => {
  const logs = fetchLogByJobId(jobId);
  return logs;
};
