import prisma from "@/app/libs/prismadb";

interface Params {
  listingId?: string;
}

export default async function getListingById(params: Params) {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: params.listingId }, include: { User: true } });
    if (!listing) return null;
    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      User: {
        ...listing.User,
        createdAt: listing.User?.createdAt.toISOString(),
        updatedAt: listing.User?.updatedAt.toISOString(),
        emailVerified: listing.User?.emailVerified?.toISOString() || null,
      },
    };
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
