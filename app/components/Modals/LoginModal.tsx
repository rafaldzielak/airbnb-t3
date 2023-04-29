"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import Input from "../Inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {
  const { isOpen, onClose } = useLoginModal();
  const { onOpen: openRegisterModal } = useRegisterModal();
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

  const toggle = () => {
    onClose();
    openRegisterModal();
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
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row justify-center gap-2'>
          <div>First time using Airbnb?</div>
          <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
            Create an account
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
