import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository ";
import paymentsRepository from "@/repositories/payments-repository ";
import { Payment } from "@prisma/client";
import { exclude } from "@/utils/prisma-utils";
import { TicketsEntity, CardData } from "@/protocols";

async function checkUserTicket(ticketId: number, userId: number): Promise<TicketsEntity> {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  return exclude(ticket, "Enrollment");
}

async function getPayment(ticketId: number, userId: number): Promise<Payment> {
  const payment = await paymentsRepository.findFirstPayment(ticketId);
  await checkUserTicket(ticketId, userId); 
  
  if(!payment) {
    throw notFoundError();
  }

  return payment;
}

async function createPayment( ticketId: number, cardData: CardData, userId: number) {
  const ticket = await checkUserTicket(ticketId, userId); 
  const price = ticket.TicketType.price;

  const created = await paymentsRepository.createPayment(ticketId, cardData, price);
  if (!created) {
    throw notFoundError();
  }

  await ticketsRepository.updateTicket(ticketId);

  const payment = await getPayment(ticketId, userId);

  return payment;
}
 
const paymentsService = {
  getPayment,
  createPayment
};

export default paymentsService;
