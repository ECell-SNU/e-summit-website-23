import { NextPage } from "next";

import { trpc } from "../../utils/trpc";

const AgaashAccomPage: NextPage = () => {
  const { data: isAgaash, ...isAgaashQuery } =
    trpc.adminRouter.checkIfAgaash.useQuery();

  const { data: accoms, ...agaashViewAccomsQuery } =
    trpc.adminRouter.agaashViewAccomodation.useQuery();

  if (isAgaashQuery.isLoading) return <div>Loading...</div>;
  if (isAgaashQuery.isError) return <div>Error</div>;

  if (!isAgaash) {
    return <div>You&apos;re not Agaash</div>;
  }

  return (
    <div className="mx-24">
      <div className="mt-20 text-3xl">Hello, Agaash.</div>

      <div>{JSON.stringify(accoms, null, 2)}</div>
    </div>
  );
};

export default AgaashAccomPage;
