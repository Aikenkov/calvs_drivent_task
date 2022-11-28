import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, paymentProcess } from "@/controllers";
import { getPayment, postPayment } from "@/controllers/payments-controller";


const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", paymentProcess);
  .get("/", getPayment)
  .post("/process", postPayment); 


export { paymentsRouter };
