import axios from "axios";

export const fetchJobs = async (
  searchKey = "",
  searchData = "",
  page = 1,
  limit = 10
) => {
  let params = `?page=${page}&limit=${limit}`;

  if (searchKey.trim() && searchData.trim()) {
    params += `&searchKey=${encodeURIComponent(
      searchKey
    )}&searchData=${encodeURIComponent(searchData)}`;
  }

  const response = await axios.get(`http://localhost:4000/jobs${params}`);
  return response;
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
