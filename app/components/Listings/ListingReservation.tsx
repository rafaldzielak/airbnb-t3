"use client";

import React, { FC } from "react";
import { Range } from "react-date-range";
import Button from "../Button/Button";
import Calendar from "../Inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  totalPrice,
  disabled,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden md:ml-8'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-600'>night</div>
        <hr />
      </div>
      <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
      <hr />
      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
