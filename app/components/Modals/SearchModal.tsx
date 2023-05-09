"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { formatISO, setDate } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import Heading from "../Heading/Heading";
import Calendar from "../Inputs/Calendar";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import Modal from "./Modal";

type Step = "LOCATION" | "DATE" | "INFO";

const steps: Step[] = ["LOCATION", "DATE", "INFO"];

const SearchModal = () => {
  const { isOpen, onClose, onOpen } = useSearchModal();

  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();

  const [step, setStep] = useState<Step>("LOCATION");
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({ startDate: new Date(), endDate: new Date(), key: "selection" });

  const Map = useMemo(() => dynamic(() => import("../Map/Map"), { ssr: false }), [location]);

  const onBack = () => setStep((currentStep) => steps[steps.findIndex((step) => step === currentStep) - 1] || 0);

  const onNext = () => setStep((currentStep) => steps[steps.findIndex((step) => step === currentStep) + 1] || 5);

  const onSubmit = useCallback(async () => {
    console.log("SUBMIT");
    if (step !== "INFO") return onNext();
    let currentQuery = {};
    if (params) currentQuery = queryString.parse(params.toString());
    const updatedQuery: any = { ...currentQuery, locationValue: location?.value, guestCount, roomCount, bathroomCount };
    if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);
    const url = queryString.stringifyUrl({ url: "/", query: updatedQuery }, { skipNull: true });
    setStep("LOCATION");
    onClose();
    router.push(url);
  }, [bathroomCount, dateRange, guestCount, location?.value, onClose, params, roomCount, router, step]);

  const actionLabel = step === "INFO" ? "Search" : "Next";
  const secondaryActionLabel = step === "LOCATION" ? undefined : "Back";

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Where do you want to go?' subtitle='Find a perfect location!' />
      <CountrySelect value={location} onChange={(value) => setLocation(value)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === "DATE") {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='When do you plan to go?' subtitle='Make sure everyone is free!' />
        <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    );
  }
  return (
    <Modal
      body={bodyContent}
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      title='Filters'
      actionLabel={actionLabel}
      secondaryAction={step === "LOCATION" ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default SearchModal;
