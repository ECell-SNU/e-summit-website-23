import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";

import { useToast } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

interface RegFormInput {
  email: string;
}

const regFormInput = z.object({
  email: z.string().email(),
});

const RegBox: React.FC = () => {
  const mutation = trpc.reg.regUser.useMutation();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegFormInput>();

  const onSubmit: SubmitHandler<RegFormInput> = async (data) => {
    try {
      regFormInput.parse(data);

      // write trpc code to add email to db here
      mutation.mutate({ email: data.email });
      console.log(data);

      toast({
        title: "Successfully registered",
        description:
          "You will now receive all event updates for E-Summit 2023.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log("error");

      toast({
        title: "Error",
        description: "Please make sure you've entered your email correctly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex w-[40vw] phone:w-[90vw] phone:flex-col phone:items-center laptop:translate-x-16">
      <input
        className="min-w-[65%] rounded-full border border-slate-500 bg-black px-10 py-5 text-gray-400 outline-none focus:ring-0 phone:min-w-[90%] phone:p-4"
        placeholder="Email Address"
        {...register("email")}
      />
      <button
        className="text-l z-10 min-w-[35%] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-1 font-bold phone:mt-3 phone:py-5 phone:px-12 laptop:-translate-x-16"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </button>
    </div>
  );
};

export default RegBox;
