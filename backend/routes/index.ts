import { Router } from "express";
import jobRoutes from "./jobs";

const webRoutes = Router();
webRoutes.use("/", jobRoutes);

export default webRoutes;
