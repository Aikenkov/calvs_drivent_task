import { Router } from "express";
import { authenticateToken, validateBody  } from "@/middlewares";
import { getAllTicketTypes, getUserTicket, postUserTicket } from "@/controllers/tickets-controller";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/", getUserTicket)
  .post("/", validateBody(createTicketSchema), postUserTicket);

export { ticketsRouter };
