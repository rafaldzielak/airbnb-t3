"use client";

import React from "react";
import Container from "../Container/Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { GiWindmill, GiIsland, GiBoatFishing, GiForestCamp, GiCastle, GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

export interface Category {
  icon: IconType;
  label: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { label: "Beach", icon: TbBeach, description: "This property is close to the beach!" },
  { label: "Windmills", icon: GiWindmill, description: "This property has windmills!" },
  { label: "Modern", icon: MdOutlineVilla, description: "This property is modern!" },
  { label: "Countryside", icon: TbMountain, description: "This property is in the countryside!" },
  { label: "Pools", icon: TbPool, description: "This property has a pool!" },
  { label: "Islands", icon: GiIsland, description: "This property is on an island!" },
  { label: "Lake", icon: GiBoatFishing, description: "This property is close to a lake!" },
  { label: "Skiing", icon: FaSkiing, description: "This property has skiing activities!" },
  { label: "Castles", icon: GiCastle, description: "This property is in a castle!" },
  { label: "Camping", icon: GiForestCamp, description: "This property has camping activities!" },
  { label: "Arctic", icon: BsSnow, description: "This property has arctic activities!" },
  { label: "Cave", icon: GiCaveEntrance, description: "This property is in a cave!" },
  { label: "Desert", icon: GiCactus, description: "This property is on the desert!" },
  { label: "Barns", icon: GiBarn, description: "This property is in a barn!" },
  { label: "Lux", icon: IoDiamond, description: "This property is luxurious!" },
];

const Categories = () => {
  const params = useSearchParams();
  const currentCategory = params?.get("category");

  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {CATEGORIES.map((category) => (
          <CategoryBox key={category.label} label={category.label} icon={category.icon} selected={category.label === currentCategory} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
