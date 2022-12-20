import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import Layout from "../components/layout";

const InitialForm: NextPage = () => {
  const { data: sessionData } = useSession();

  return sessionData ? (
    <Layout>
      <div className="mx-auto flex flex-col items-center">
        <div>
          <div className="mt-10 text-5xl phone:text-4xl">
            Welcome, {sessionData.user?.name?.split(" ")[0]}.
          </div>
          <div className="text-sm laptop:text-base">
            Enter your details to continue.
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <></>
  );
};

export default InitialForm;
