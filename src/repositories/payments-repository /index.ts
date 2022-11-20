import { prisma } from "@/config";
import { } from "@prisma/client";

async function findFirstPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentsRepository = {
  findFirstPayment,
};

export default paymentsRepository;
