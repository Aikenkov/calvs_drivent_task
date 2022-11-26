import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelWithRooms(
  req: AuthenticatedRequest,
  res: Response,
) {
  const { userId } = req;
  const hotelId = req.params.hotelId;

  try {
    const hotelWithRooms = await hotelsService.getHotelWithRooms(
      userId,
      Number(hotelId),
    );

    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    console.log(error);
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
