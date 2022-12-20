import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { useForm, SubmitHandler } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

import Layout from "../components/layout";

interface InitFormInputs {
  university: string;
  fieldOfStudy: string;
  yearOfStudy: number;
  mobileNumber: string;
}

const InitialForm: NextPage = () => {
  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitFormInputs>();

  const onSubmit: SubmitHandler<InitFormInputs> = (data) => {
    console.log(data);
  };

  return sessionData ? (
    <Layout>
      <div className="mx-auto flex w-[40vw] flex-col items-start phone:w-[90vw]">
        <div>
          <div className="mt-10 text-5xl phone:text-4xl">
            Welcome, {sessionData.user?.name?.split(" ")[0]}.
          </div>
          <div className="text-sm laptop:text-base">
            Enter your details to continue.
          </div>
        </div>

        <FormControl className="w-full">
          <Input
            className="mt-5 w-[80%]"
            variant="flushed"
            placeholder="University"
            {...register("university", { required: true })}
          />
          {errors.university && (
            <FormHelperText color="red.400">
              This field is required
            </FormHelperText>
          )}
          <Input
            className="mt-10 w-[80%]"
            variant="flushed"
            placeholder="Field of Study"
            {...register("fieldOfStudy", { required: true })}
          />
          {errors.fieldOfStudy && (
            <FormHelperText color="red.400">
              This field is required
            </FormHelperText>
          )}
          <Select
            className="w-[80%]"
            marginTop="38px"
            variant="flushed"
            placeholder="Year of Study"
            {...register("yearOfStudy", { required: true })}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </Select>
          {errors.yearOfStudy && (
            <FormHelperText color="red.400">
              This field is required
            </FormHelperText>
          )}
          <Input
            className="mt-10 w-[80%]"
            variant="flushed"
            placeholder="Mobile number"
            {...register("mobileNumber", { required: true })}
          />
          {errors.mobileNumber && (
            <FormHelperText color="red.400">
              This field is required
            </FormHelperText>
          )}
          <Button
            mt={14}
            colorScheme="black"
            type="submit"
            variant="outline"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </Layout>
  ) : (
    <></>
  );
};

export default InitialForm;
