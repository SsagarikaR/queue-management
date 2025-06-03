import axios from "axios";

export const fetchLogs = async (id?: number) => {
  const response = id
    ? await axios.get(`${import.meta.env.VITE_API_URL}logs?id=${id}`)
    : await axios.get(`${import.meta.env.VITE_API_URL}logs`);
  return response;
};

export const updateLogs = async (
  id: number,
  data: { jobType?: string; status?: string; progress?: number; logs?: string }
) => {
  const jobs = await axios.put(
    `${import.meta.env.VITE_API_URL}logs/${id}`,
    data
  );
  return jobs;
};

export const deleteLogs = async (id: number) => {
  const jobs = await axios.delete(`${import.meta.env.VITE_API_URL}logs/${id}`);
  return jobs;
};
