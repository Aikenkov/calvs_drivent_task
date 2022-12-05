import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";
import hotelRepository from "@/repositories/hotel-repository";
import { notFoundError, forbiddenError } from "@/errors";

async function listBookings(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }

  const { id, Room } = booking;

  return {
    id,
    Room,
  };
}

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw forbiddenError();
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (
    !ticket ||
    ticket.TicketType.isRemote ||
    ticket.status === "RESERVED" ||
    !ticket.TicketType.includesHotel
  ) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.findBookingByUserId(userId);
  if (booking) throw forbiddenError();

  const room = await hotelRepository.findRoomById(roomId);
  if (!room) {
    throw notFoundError();
  }

  const vacancies = await bookingRepository.findRoomBookings(roomId);
  if (vacancies.length === room.capacity) throw forbiddenError();

  const createdBooking = await bookingRepository.createBooking(userId, roomId);
  return createdBooking;
}

async function updateBooking(userId: number, roomId: number) {
  const booking = await listBookings(userId);
  if (!booking) throw notFoundError();

  const vacancies = await bookingRepository.findRoomBookings(roomId);

  const room = await hotelRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  if (vacancies.length === room.capacity) throw forbiddenError();

  const updatedBooking = await bookingRepository.updateBooking(
    userId,
    roomId,
    booking.id,
  );

  return updatedBooking;
}

const bookingService = {
  listBookings,
  createBooking,
  updateBooking,
};

export default bookingService;
