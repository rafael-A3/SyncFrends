import "dotenv/config";
const PORT = process.env.PORT ?? 3000;
import app from "./app";
import { prisma } from "../utils/prisma";

prisma.$connect()
    .then(() => console.log("Connected to postgres"))

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})