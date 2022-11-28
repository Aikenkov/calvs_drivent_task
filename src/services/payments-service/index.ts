import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const ticket = await ticketRepository.findTickeWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, paymentData);

  await ticketRepository.ticketProcessPayment(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentService = {
  getPaymentByTicketId,
  paymentProcess,
};

export default paymentService;

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
