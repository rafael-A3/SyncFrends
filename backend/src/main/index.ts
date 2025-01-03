import "dotenv/config";
import { prisma } from "../utils/prisma";
import app from "./app";

const PORT = process.env.PORT ?? 3000;

prisma.$connect()
    .then(() => console.log("Connected to postgres"))

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})