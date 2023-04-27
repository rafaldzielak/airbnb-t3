"use client";

import React, { useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading/Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const { isOpen, onClose, onOpen } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => onClose())
      .catch(() => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input register={register} id='email' label='Email' disabled={isLoading} errors={errors} required />
      <Input register={register} id='name' label='Name' disabled={isLoading} errors={errors} required />
      <Input register={register} id='password' label='Password' disabled={isLoading} errors={errors} required type='password' />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {}} />
      <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row justify-center Zgap-2'>
          <div>Alread have an account?</div>
          <div onClick={onClose} className='text-neutral-800 cursor-pointer hover:underline'>
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
