import { prisma } from "@/config";
import { CardData } from "@/protocols";

async function findFirstPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, cardData: CardData, value: number) {
  return prisma.payment.create({
    data: {
      value,
      cardIssuer: cardData.issuer,
      ticketId,
      cardLastDigits: String(cardData.number).slice(-4),
    },
  });
}

const paymentsRepository = {
  findFirstPayment,
  createPayment
};

export default paymentsRepository;
