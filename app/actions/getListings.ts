import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/app/libs/prismadb";

// This allows to get use the user without API call via server component

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({ orderBy: { createdAt: "desc" } });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
