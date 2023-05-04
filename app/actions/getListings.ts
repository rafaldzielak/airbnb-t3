import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

// This allows to get use the user without API call via server component

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({ orderBy: { createdAt: "desc" } });
    const safeListings: SafeListing[] = listings.map((listing) => ({ ...listing, createdAt: listing.createdAt.toISOString() }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
