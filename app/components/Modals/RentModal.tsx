"use client";

import useRentModal from "@/app/hooks/useRentModal";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading/Heading";
import CategoryInput from "../Inputs/CategoryInput";
import Counter from "../Inputs/Counter";
import CountrySelect from "../Inputs/CountrySelect";

import { CATEGORIES } from "../Navbar/Categories";
import Modal from "./Modal";

type Step = "CATEGORY" | "LOCATION" | "INFO" | "IMAGES" | "DESCRIPTION" | "PRICE";

const steps: Step[] = ["CATEGORY", "LOCATION", "INFO", "IMAGES", "DESCRIPTION", "PRICE"];

const RentModal = () => {
  const { isOpen, onClose } = useRentModal();
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState<Step>("CATEGORY");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const currentCategory = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const Map = useMemo(() => dynamic(() => import("../Map/Map"), { ssr: false }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const onBack = () => setStep((currentStep) => steps[steps.findIndex((step) => step === currentStep) - 1] || 0);

  const onNext = () => setStep((currentStep) => steps[steps.findIndex((step) => step === currentStep) + 1] || 5);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Which of these best describes your place' subtitle='Pick a category' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {CATEGORIES.map((category) => (
          <div key={category.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={currentCategory === category.label}
              label={category.label}
              icon={category.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === "LOCATION")
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Where is your place located?' subtitle='Help guests find you!' />
        <CountrySelect onChange={(value) => setCustomValue("location", value)} value={location} />
        <Map center={location?.latlng} />
      </div>
    );
  if (step === "INFO")
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Share some basics about your place' subtitle='What amenities do you have?' />
        <Counter
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter title='Rooms' subtitle='How many rooms do you have?' value={roomCount} onChange={(v) => setCustomValue("roomCount", v)} />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    );

  const actionLabel = useMemo(() => {
    if (step === "PRICE") return "Create";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === "CATEGORY") return undefined;
    return "Back";
  }, [step]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Airbnb your home'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      onClose={onClose}
      onSubmit={onNext}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default RentModal;
