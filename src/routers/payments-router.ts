import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment } from "@/controllers/payments-controller";
//import {  } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment);
// .post("/process", validateBody(), ); 

export { paymentsRouter };
