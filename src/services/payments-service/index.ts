import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository ";
import paymentsRepository from "@/repositories/payments-repository ";
import { Payment } from "@prisma/client";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";

async function getPayment(ticketId: number, userId: number) {
  const payment = await paymentsRepository.findFirstPayment(ticketId);
  const ticket = await ticketsRepository.findTicketById(ticketId); 
  
  if(!ticket) {
    throw notFoundError();
  }

  if(ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  return payment;
}
 
const paymentsService = {
  getPayment
};

export default paymentsService;
