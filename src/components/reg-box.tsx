import React from "react";
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
    <div className="flex w-[75%] sm:w-[65%] md:w-[45%] translate-x-[3%] md:translate-x-[8%]">
      <input
        className="min-w-[65%] text-[10px] sm:text-xs md:text-sm lg:text-xl px-2 sm:px-5 md:px-10 sm:py-2 lg:py-3 rounded-full border border-slate-500 bg-black text-gray-400 outline-none focus:ring-0"
        placeholder="Email Address"
        {...register("email")}
      />
      <button
        className="text-[12px] sm:text-sm md:text-xl z-10 min-w-[35%] py-1 font-bold -translate-x-8 md:-translate-x-10 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </button>
    </div>
  );
};

export default RegBox;
