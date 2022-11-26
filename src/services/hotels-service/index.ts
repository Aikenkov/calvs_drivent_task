import { notFoundError, unauthorizedError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import paymentRepository from "@/repositories/payment-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";

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

  return hotelRepository.findHotels();
}

async function getHotelWithRooms(userId: number, hotelId: number) {
  await verifyUser(userId);
  const hotelRoom = await hotelRepository.findHotelRooms(hotelId);
  console.log(hotelRoom);

  return hotelRoom;
}

const hotelsService = {
  getHotels,
  getHotelWithRooms,
};

export default hotelsService;
