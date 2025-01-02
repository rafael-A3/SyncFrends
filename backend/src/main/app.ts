import "express-async-errors";
import express from "express";
import cors from "cors";
import { GlobalHandler } from "../utils/exceptions/globalHandler";
import { router } from "../routes/routes";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(router)
app.use(GlobalHandler)
app.use(cors())

export default app;