"use client";
import React, { FC } from "react";
import { Category } from "../Navbar/Categories";

interface ListingCategoryProps {
  category: Category;
}

const ListingCategory: FC<ListingCategoryProps> = ({ category }) => {
  const { icon: Icon, label, description } = category;
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row items-center gap-4'>
        <Icon size={40} className='text-neutral-600' />
        <div className='flex flex-col'>
          <div className='text-lg font-semibold'>{label}</div>
          <div className='text-neutral-500 font-light'>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
