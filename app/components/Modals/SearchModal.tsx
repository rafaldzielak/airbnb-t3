"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import Heading from "../Heading/Heading";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import Modal from "./Modal";

type Step = "CATEGORY" | "LOCATION" | "INFO" | "IMAGES" | "DESCRIPTION" | "PRICE";

const steps: Step[] = ["CATEGORY", "LOCATION", "INFO", "IMAGES", "DESCRIPTION", "PRICE"];

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

  const actionLabel = () => {
    if (step === "INFO") return "Search";
    return "Next";
  };

  const secondaryActionLabel = () => {
    if (step === "LOCATION") return undefined;
    return "Back";
  };

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Where do you want to go?' subtitle='Find a perfect location!' />
      <CountrySelect value={location} onChange={(value) => setLocation(value)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  return <Modal body={bodyContent} isOpen={isOpen} onSubmit={onOpen} onClose={onClose} title='Filters' actionLabel='Search' />;
};

export default SearchModal;
