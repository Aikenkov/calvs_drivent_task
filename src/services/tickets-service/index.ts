import { notFoundError } from "@/errors";
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
