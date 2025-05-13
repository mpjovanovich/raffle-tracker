import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import eventsRouter from "./routes/events.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/events", eventsRouter);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: logger
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Global 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
