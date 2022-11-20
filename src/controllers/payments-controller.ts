import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;

  try {
    const payment = await paymentsService.getPayment(Number(ticketId), Number(userId));

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
