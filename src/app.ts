import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/", router);

app.get("/", (req, res) => {
  res.send("Welcome to my bootcamp first assignment!");
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
