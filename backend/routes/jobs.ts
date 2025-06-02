import { Router } from "express";
import { create, update, fetch, remove } from "../controller/jobs";

const routes = Router();
routes.post("/jobs", create);
routes.put("/jobs/:id", update);
routes.get("/jobs", fetch);
routes.delete("/jobs/:id", remove);
export default routes;
