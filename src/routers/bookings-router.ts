import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBooking, createBooking, updateBooking } from "@/controllers";
import { roomIdSchema } from "@/schemas";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(roomIdSchema), createBooking)
  .put("/", validateBody(roomIdSchema), updateBooking);

export { bookingsRouter };
