import { Router } from "express";
import { create, update, fetch, remove } from "../controller/logs";

const routes = Router();
routes.post("/logs", create);
routes.put("/logs/:id", update);
routes.get("/logs", fetch);
routes.delete("/logs/:id", remove);
export default routes;
