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

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}jobs${params}`
  );
  return response;
};

export const updateJobs = async (
  id: number,
  data: { jobType?: string; status?: string; progress?: number; logs?: string }
) => {
  const jobs = await axios.put(`${import.meta.env.VITE_API_URL}${id}`, data);
  return jobs;
};

export const deleteJobs = async (id: number) => {
  const jobs = await axios.delete(`${import.meta.env.VITE_API_URL}{id}`);
  return jobs;
};
