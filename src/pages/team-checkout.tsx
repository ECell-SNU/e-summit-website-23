import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import { EditIcon } from "@chakra-ui/icons";

import { useAtom } from "jotai";
import { showMemberModalAtom } from "../atoms/index";

import useCheckout, { type Member } from "../hooks/useCheckout";
import TeamCheckoutModal from "../components/team-checkout-modal";

const TeamCheckout: NextPage = () => {
  const [showMemberModal, setShowMemberModal] = useAtom(showMemberModalAtom);

  const checkout = useCheckout();

  const {
    isActive,
    setIsActive,
    members,
    addMember,
    editMember,
    removeMember,
  } = checkout;

  return (
    <div className="mt-20">
      {/* <div className="text-3xl"></div> */}
      <div className="mx-auto h-[40vh] w-[40vw]">
        {/* <div>main contents</div> */}
        {members.map(({ name, ...member }, i: number) => (
          <div
            key={i}
            className="m-2 flex items-center justify-between rounded-md bg-slate-500 p-4"
          >
            <div className="text-3xl">{name}</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                console.log("editing", name);
                setIsActive(i);
                setShowMemberModal(true);
              }}
            >
              <EditIcon boxSize={7} />
            </div>
          </div>
        ))}
      </div>

      <TeamCheckoutModal checkout={checkout} />
    </div>
  );
};

export default TeamCheckout;
