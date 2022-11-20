import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findManyTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findOneUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    include: {
      TicketType: true,
      Enrollment: true,
    },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
  });
}

const ticketsRepository = {
  findManyTicketTypes,
  findOneUserTicket,
  createTicket,
  findTicketById
};

export default ticketsRepository;
