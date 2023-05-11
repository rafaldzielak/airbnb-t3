import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export interface ListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category: string;
}

// This allows to get use the user without API call via server component

export default async function getListings(params: ListingsParams) {
  try {
    const { userId, category, bathroomCount, endDate, guestCount, locationValue, roomCount, startDate } = params;
    let query: any = {};
    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (locationValue) query.locationValue = locationValue;
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({ orderBy: { createdAt: "desc" }, where: query });
    const safeListings: SafeListing[] = listings.map((listing) => ({ ...listing, createdAt: listing.createdAt.toISOString() }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
