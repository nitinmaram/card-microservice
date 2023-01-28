import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const cardService = {
    addCard: async ({ customerName, cardNumber, limit }) =>
        await prisma.card?.create({
            data: {
                customerName,
                cardNumber,
                limit
            }
        }),
    getAllCards: async () => await prisma.card?.findMany(),
    deleteCard: async (card) => await prisma.card?.delete({
        where: { cardNumber: card.cardNumber }
    })
}