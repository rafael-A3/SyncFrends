import "express-async-errors";
import express from "express";
import cors from "cors";
import { GlobalHandler } from "../utils/exceptions/global.handler";

const app = express();
app.use(express.json())
app.use(GlobalHandler)
app.use(cors())

export default app;