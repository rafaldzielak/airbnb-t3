"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import React, { FC } from "react";
import Avatar from "../Avatar/Avatar";
import { Category } from "../Navbar/Categories";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  listing: SafeListing & { User: SafeUser };
  category: Category | undefined;
}

const Map = dynamic(() => import("../Map/Map"), { ssr: false });

const ListingInfo: FC<ListingInfoProps> = ({ category, listing }) => {
  const { User, description, guestCount, roomCount, bathroomCount, locationValue } = listing;
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>Hosted by {User?.name}</div>
          <Avatar src={User?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light marker:text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory category={category} />}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
