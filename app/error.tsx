"use client";

import { FC, useEffect } from "react";

import React from "react";
import EmptyState from "./components/EmptyState/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title='Error' subtitle='Something went wrong!' />;
};

export default ErrorState;
