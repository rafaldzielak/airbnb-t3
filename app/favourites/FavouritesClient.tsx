"use client";

import { FC } from "react";
import Container from "../components/Container/Container";
import Heading from "../components/Heading/Heading";
import ListingCard from "../components/Listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavouritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const FavouritesClient: FC<FavouritesClientProps> = ({ currentUser, listings }) => {
  return (
    <Container>
      <Heading title='Favourites' subtitle='List of places you have favourited!' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
