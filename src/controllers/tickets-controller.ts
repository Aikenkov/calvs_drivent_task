import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const userTickets = await ticketsService.getTicketsByUserId(userId);

    return res.status(httpStatus.OK).send(userTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postAllUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const userTickets = await ticketsService.getTicketsByUser(userId);

    return res.status(httpStatus.OK).send(userTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
