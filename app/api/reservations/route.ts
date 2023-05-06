import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Params {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  const listingAndReservation = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: { userId: currentUser.id, startDate, endDate, totalPrice },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
