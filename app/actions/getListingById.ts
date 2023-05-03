import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

interface Params {
  listingId?: string;
}

export default async function getListingById(params: Params) {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: params.listingId }, include: { user: true } });
    if (!listing) return null;
    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user?.createdAt.toISOString(),
        updatedAt: listing.user?.updatedAt.toISOString(),
        emailVerified: listing.user?.emailVerified?.toISOString() || null,
      },
    };
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
