import { useEffect, useRef, useState } from "react";
import { deleteJobs, fetchJobs, updateJobs } from "../service/jobs";
import { AxiosError } from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Logs, Play, RefreshCcw, Trash } from "lucide-react";

export interface Job {
  id: number;
  jobType: string;
  status: string;
  progress: number;
  logs: string;
  createdAt: string;
}

function QueueManagement() {
  const [jobs, setJobs] = useState<Job[] | undefined>();
  const [searchKey, setSearchKey] = useState<string>("jobType");
  const [searchData, setSearchData] = useState<string>("");
  const [err, setErr] = useState<string | undefined>();
  const [currentSelectLog, setCurrentSelectLog] = useState<string>();
  const [currentSelect, setCurrentSelect] = useState<number>();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = "ws://localhost:4000/api/ws";

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
  const getData = async () => {
    try {
      const data = await fetchJobs(searchKey, searchData);
      setJobs(data.data.result);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr(err.response?.data.message);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [searchKey, searchData]);

  return (
    <div className="w-screen h-screen p-6 flex flex-col gap-6 bg-gray-100">
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
                    className="text-gray-500 hover:text-gray-700"
                    onClick={async () => {
                      await setCurrentSelectLog(job.logs);
                      await setCurrentSelect(job.id);
                    }}
                  >
                    <Logs />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {err && (
        <div className="text-red-500 text-center">
          <p>Error: {err}</p>
        </div>
      )}

      {currentSelect && currentSelect && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h3 className="text-lg font-semibold mb-4">
            Logs for Job #{currentSelect}
          </h3>
          <p className="text-gray-700">{currentSelectLog}</p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
            onClick={() => setCurrentSelect(undefined)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default QueueManagement;
