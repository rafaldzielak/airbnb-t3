import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export interface ListingsParams {
  userId?: string;
}

// This allows to get use the user without API call via server component

export default async function getListings(params: ListingsParams) {
  try {
    const { userId } = params;
    let query: any = {};
    if (userId) query.userId = userId;

    const listings = await prisma.listing.findMany({ orderBy: { createdAt: "desc" }, where: query });
    const safeListings: SafeListing[] = listings.map((listing) => ({ ...listing, createdAt: listing.createdAt.toISOString() }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
