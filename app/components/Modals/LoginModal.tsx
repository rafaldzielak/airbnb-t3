"use client";

import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading/Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const { isOpen, onClose } = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((cb) => {
      setIsLoading(false);
      if (cb?.ok) {
        toast.success("Logged in");
        router.refresh();
        onClose();
      }
      if (cb?.error) toast.error(cb.error);
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input register={register} id='email' label='Email' disabled={isLoading} errors={errors} required />
      <Input register={register} id='password' label='Password' disabled={isLoading} errors={errors} required type='password' />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {}} />
      <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => {}} />
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
      title='Login'
      actionLabel='Continue'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
