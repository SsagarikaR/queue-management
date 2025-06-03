import { useCallback, useEffect, useRef, useState } from "react";
import { deleteJobs, fetchJobs, updateJobs } from "../service/jobs";
import { AxiosError } from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Logs,
  Play,
  RefreshCcw,
  Trash,
} from "lucide-react";
import { fetchLogs } from "../service/logs";

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

function QueueManagement() {
  const [jobs, setJobs] = useState<Job[] | undefined>();
  const [searchKey, setSearchKey] = useState<string>("jobType");
  const [searchData, setSearchData] = useState<string>("");
  const [err, setErr] = useState<string | undefined>();
  const [currentSelectLog, setCurrentSelectLog] = useState<
    Logs[] | undefined
  >();
  const [currentSelectQueue, setCurrentSelectQueue] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const [totalPages, setTotalPages] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "updated-queue") {
        await getData();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (currentSelectQueue) {
      fetchLog();
    }
  }, [currentSelectQueue]);

  const fetchLog = useCallback(async () => {
    try {
      const response = await fetchLogs(currentSelectQueue);
      console.log(response);
      setCurrentSelectLog(response.data.result);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr(err.response?.data.message);
      }
    }
  }, [currentSelectQueue]);
  const getData = async () => {
    try {
      const data = await fetchJobs(
        searchKey,
        searchData,
        currentPage,
        pageSize
      );
      console.log(data);
      setJobs(data.data.result.jobs);
      setTotalPages(data.data.result.totalPages);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr(err.response?.data.message);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [searchKey, searchData, pageSize, currentPage]);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-screen h-screen p-6 flex flex-col gap-6 bg-blue-100">
      <div className="flex gap-4 items-center ">
        <input
          type="text"
          placeholder="Search..."
          className="border border-black rounded-lg px-4 py-2 w-[85%]  outline-none"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <select
          className="border border-black  rounded-lg   w-[15%] px-4 py-2 outline-none"
          onChange={(e) => setSearchKey(e.target.value)}
          defaultValue="jobType"
        >
          <option value="jobType">Job Type</option>
          <option value="status">Status</option>
          <option value="pending">Date</option>
        </select>
      </div>

      <Table className="bg-white shadow-md rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">ID</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Progress</TableHead>
            <TableHead className="text-right">Started</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-gray-100">
                <TableCell className="text-center">{job.id}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell
                  className={`${
                    job.status === "Fail"
                      ? "text-red-700"
                      : job.status === "Pend"
                      ? "text-yellow-700"
                      : "text-green-700"
                  }`}
                >
                  {job.status}
                </TableCell>
                <TableCell className="text-right">{job.progress}%</TableCell>
                <TableCell className="text-right">{job.createdAt}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  {job.status !== "Fail" ? (
                    job.status === "Pend" ? (
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          updateJobs(job.id, { status: "Run" });
                          getData();
                          console.log(wsRef.current);
                          wsRef.current?.send(
                            JSON.stringify({
                              type: "updated-queue",
                            })
                          );
                        }}
                      >
                        <Play />
                      </button>
                    ) : (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={async () => {
                          await deleteJobs(job.id);
                          await getData();
                          console.log(wsRef.current);
                          wsRef.current?.send(
                            JSON.stringify({
                              type: "updated-queue",
                            })
                          );
                        }}
                      >
                        <Trash />
                      </button>
                    )
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={async () => {
                        await updateJobs(job.id, { status: "Pend" });
                        await getData();
                        console.log(wsRef.current);
                        wsRef.current?.send(
                          JSON.stringify({
                            type: "updated-queue",
                          })
                        );
                      }}
                    >
                      <RefreshCcw />
                    </button>
                  )}
                  <button
                    className="text-gray-500 "
                    onClick={async () => {
                      setCurrentSelectQueue(job.id);
                    }}
                  >
                    <Logs />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center ">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-4  p-4">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {err && (
        <div className="text-red-500 text-center">
          <p>Error: {err}</p>
        </div>
      )}

      {currentSelectQueue && currentSelectLog && (
        <div className="bg-white p-6 border  w-1/2">
          <h3 className="text-lg font-semibold mb-4">
            Logs of job {currentSelectQueue}
          </h3>
          {currentSelectLog.length > 0 &&
            currentSelectLog.map((log) => {
              return (
                <div>
                  <span>{log.createdAt}</span>
                  <span>{log.description}</span>
                </div>
              );
            })}
          <p></p>
          <button
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-sm"
            onClick={() => setCurrentSelectLog(undefined)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default QueueManagement;
