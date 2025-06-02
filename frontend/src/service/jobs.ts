import axios from "axios";

export const fetchJobs = async (searchKey: string, searchData: string) => {
  let param;
  if (searchKey && searchData.trim()) {
    param = `?searchKey=${searchKey}&searchData=${searchData}`;
  }
  if (param) {
    const jobs = await axios.get(`http://localhost:4000/jobs${param}`);
    return jobs;
  } else {
    const jobs = await axios.get(`http://localhost:4000/jobs`);
    return jobs;
  }
};

export const updateJobs = async (
  id: number,
  data: { jobType?: string; status?: string; progress?: number; logs?: string }
) => {
  const jobs = await axios.put(`http://localhost:4000/jobs/${id}`, data);
  return jobs;
};

export const deleteJobs = async (id: number) => {
  const jobs = await axios.delete(`http://localhost:4000/jobs/${id}`);
  return jobs;
};
