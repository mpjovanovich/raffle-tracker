import express from "express";
import { eventService } from "../services/eventService.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await eventService.findAll();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const event = await eventService.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

export default router;
