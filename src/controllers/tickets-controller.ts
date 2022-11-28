import { AuthenticatedRequest } from "@/middlewares";

import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketService.getTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketTypes = await ticketService.getTicketByUserId(userId);

    return res.status(httpStatus.OK).send(ticketTypes);

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
    const userTicket = await ticketsService.getTicketsByUserId(userId);

    return res.status(httpStatus.OK).send(userTicket);

  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  //TODO validação do JOI
  const { ticketTypeId } = req.body;

  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const ticketTypes = await ticketService.createTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticketTypes);

export async function postUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    await ticketsService.createTicket(userId, ticketTypeId);
    const userTicket = await ticketsService.getTicketsByUserId(userId);
    
    return res.status(httpStatus.CREATED).send(userTicket);

  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
