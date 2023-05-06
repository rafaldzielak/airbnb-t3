import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/ClientOnly.tsx/ClientOnly";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import { SafeReservation } from "@/app/types";
import React from "react";
import getListingById from "../../actions/getListingById";
import ListingClient from "./ListingClient";

// This is server component - we can't use hooks here
interface Params {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations({ listingId: params.listingId });
  const currentUser = await getCurrentUser();

  if (!listing)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default ListingPage;
