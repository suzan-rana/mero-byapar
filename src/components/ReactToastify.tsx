"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const ReactToastify = (props: Props) => {
  return (
    <ToastContainer
      toastClassName={() =>
        "shadow-md bg-white border-gray-300 rounded border  mx-auto mt-8 sm:mt-0 w-[80%] sm:w-auto text-sm sm:text-md text-black py-3  pl-4"
      }
      position="top-center"
      closeButton={false}
      hideProgressBar
      limit={4}
      role="alert"
      autoClose={1500}
      // transition={}
    />
  );
};

export default ReactToastify;
