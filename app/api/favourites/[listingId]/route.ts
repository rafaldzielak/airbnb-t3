import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Params {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID");

  const favouriteIds = [...(currentUser.favouriteIds || [])];
  favouriteIds.push(listingId);
  const user = await prisma.user.update({ where: { id: currentUser.id }, data: { favouriteIds } });
  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID");

  const favouriteIds = [...(currentUser.favouriteIds || [])].filter((id) => id !== listingId);
  const user = await prisma.user.update({ where: { id: currentUser.id }, data: { favouriteIds } });
  return NextResponse.json(user);
}
