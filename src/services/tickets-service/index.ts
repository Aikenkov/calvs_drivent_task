import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket
};

export default ticketService;

import ticketsRepository from "@/repositories/tickets-repository ";
import enrollmentRepository from "@/repositories/enrollment-repository";
import userRepository from "@/repositories/user-repository";
import { TicketType } from "@prisma/client";
import { exclude } from "@/utils/prisma-utils";
import { TicketsEntity } from "@/protocols";

async function checkRegistration(userId: number) {
  const user = await userRepository.findByUserId(userId);
  
  if(!user) {
    throw notFoundError();
  }
}

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.findManyTicketTypes();
  
  return ticketTypes;
}

async function getTicketsByUserId(userId: number): Promise<TicketsEntity> {
  checkRegistration(userId);
  const userTickets = await ticketsRepository.findOneUserTicket(userId);

  if (!userTickets) throw notFoundError();
  
  return exclude(userTickets, "Enrollment");
}

async function createTicket(userId: number, ticketTypeId: number) {
  checkRegistration(userId);
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  await ticketsRepository.createTicket(enrollment.id, ticketTypeId);
}

const ticketsService = {
  getTicketTypes,
  getTicketsByUserId,
  createTicket
};

export default ticketsService;

