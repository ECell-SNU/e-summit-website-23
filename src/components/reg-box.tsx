import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";

import { useToast } from "@chakra-ui/react";

interface RegFormInput {
  email: string;
}

const regFormInput = z.object({
  email: z.string().email(),
});

const RegBox: React.FC = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegFormInput>();

  const onSubmit: SubmitHandler<RegFormInput> = (data) => {
    try {
      regFormInput.parse(data);

      // write trpc code to add email to db here
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
    <div className="flex w-[40vw] translate-x-16 phone:hidden">
      <input
        className="min-w-[65%] rounded-full border border-slate-500 bg-black px-10 py-5 text-gray-400 outline-none focus:ring-0"
        placeholder="Email Address"
        {...register("email")}
      />
      <button
        className="min-w-[35%] -translate-x-16 rounded-full py-1 font-bold"
        style={{
          background:
            "linear-gradient(90deg, #AD05BC 0%, #FF1761 52.4%, #FBC82E 100%)",
        }}
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </button>
    </div>
  );
};

export default RegBox;
