"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container/Container";
import Heading from "../components/Heading/Heading";
import ListingCard from "../components/Listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const ReservationsClient: FC<ReservationsClientProps> = ({ currentUser, reservations }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = (id: string) => {
    setDeletingId(id);
    axios
      .delete(`api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setDeletingId(""));
  };
  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.Listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
