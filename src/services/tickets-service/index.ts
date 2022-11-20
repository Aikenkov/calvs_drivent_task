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

const ticketsService = {
  getTicketTypes,
  getTicketsByUserId
};

export default ticketsService;
