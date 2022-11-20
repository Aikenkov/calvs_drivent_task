import { Router } from "express";
import { authenticateToken/* , validateBody */ } from "@/middlewares";
import { getAllTicketTypes, getAllUserTicket } from "@/controllers/tickets-controller";
//import {  } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/", getAllUserTicket)
  .post("/", );

export { ticketsRouter };
