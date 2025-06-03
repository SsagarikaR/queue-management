import { Router } from "express";
import jobRoutes from "./jobs";
import logRoutes from "./logs";

const webRoutes = Router();
webRoutes.use("/", jobRoutes);
webRoutes.use("/", logRoutes);

export default webRoutes;
