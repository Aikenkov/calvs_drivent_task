import Joi from "joi";

export const createTicketSchema = Joi.object({
  ticketTypeId: Joi.number().min(1).required(),
});
