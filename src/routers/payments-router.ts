import { Router } from "express";
import { authenticateToken/* , validateBody */ } from "@/middlewares";
//import {  } from "@/controllers";
//import {  } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken);
// .get("/?ticketId=1", )
// .post("/process", validateBody(), ); 

export { paymentsRouter };
