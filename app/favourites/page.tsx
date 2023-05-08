import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteLisitings from "../actions/getFavouriteListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly.tsx/ClientOnly";
import EmptyState from "../components/EmptyState/EmptyState";
import FavouritesClient from "./FavouritesClient";
// import ReservationsClient from "./ReservationsClient";

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    );
  const listings = await getFavouriteLisitings();
  if (!listings.length)
    return (
      <ClientOnly>
        <EmptyState title='No favourites found' subtitle='Looks like you have no favourite listings.' />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <FavouritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavouritesPage;
