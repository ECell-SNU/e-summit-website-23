import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import TeamCheckoutModal from "../components/team-checkout-modal";

const TeamCheckout: NextPage = () => {
  return (
    <div className="mt-20">
      {/* <div className="text-3xl"></div> */}
      <div className="mx-auto h-[40vh] w-[40vw]">
        <div>main contents</div>
      </div>

      <TeamCheckoutModal />
    </div>
  );
};

export default TeamCheckout;
