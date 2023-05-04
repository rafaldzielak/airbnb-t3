"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import Image from "next/image";
import React, { FC } from "react";
import Heading from "../Heading/Heading";
import HeartButton from "../HeartButton/HeartButton";

interface ListingHeadProps {
  listing: SafeListing;
  currentUser?: SafeUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({ listing, currentUser }) => {
  const { title, locationValue, imageSrc, id } = listing;

  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image alt='Image' src={imageSrc} fill className='object-cover w-full' />
        <div className='absolute top-5 right-5'>
          <HeartButton currentUser={currentUser} listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
