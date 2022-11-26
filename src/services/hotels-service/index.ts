import { notFoundError, unauthorizedError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import paymentRepository from "@/repositories/payment-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function verifyUser(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  const payment = await paymentRepository.findPaymentByTicketId(ticket.id);
  if (!enrollment) {
    throw notFoundError();
  }
  if (
    !ticket ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false ||
    !payment
  ) {
    throw unauthorizedError();
  }
}

async function getHotels(userId: number) {
  await verifyUser(userId);

  return [1];
}

async function getHotelWithRooms(userId: number) {
  await verifyUser(userId);

  return [1];
}

const hotelsService = {
  getHotels,
  getHotelWithRooms,
};

export default hotelsService;
