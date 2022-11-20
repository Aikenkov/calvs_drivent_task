import { prisma } from "@/config";

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

const ticketsRepository = {
  findManyTicketTypes,
  findOneUserTicket
};

export default ticketsRepository;
