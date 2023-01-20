import { useState } from "react";

import type { NextPage } from "next";

import { Input } from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

const TeamCheckout: NextPage = () => {
  const [showMemberUI, setShowMemberUI] = useState(true);

  return (
    <div className="mt-20">
      {/* <div className="text-3xl"></div> */}
      <div className="mx-auto h-[40vh] w-[40vw]">
        <div>main contents</div>
      </div>

      <div
        className={`
					absolute top-[7vh] bottom-0 left-0 right-0 z-40 flex h-[80vh]
					w-full items-center justify-center backdrop-blur-md sm:h-screen md:top-[10vh]
          md:h-[40vh]
					${showMemberUI ? "" : "invisible"}
				`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="z-60 relative flex h-full w-full flex-col border border-white/50 bg-black sm:w-[600px] sm:rounded-xl">
          <button
            className="absolute top-4 right-4 rounded-md border border-white/50 px-2"
            onClick={() => {
              setShowMemberUI(false);
            }}
          >
            x
          </button>
          <div className="flex w-full flex-col gap-1 p-6">
            <p className="text-xl font-[600] text-white">
              E-Summit &apos;23 Ticket
            </p>
          </div>
          <div className="my-1 h-full flex-col overflow-y-auto border-y-[1px] border-white/50 p-6">
            <div className="flex flex-col gap-6 rounded-md bg-[#161616] p-4 text-left text-sm">
              <div>hi</div>
            </div>
          </div>
          <div className="flex items-center py-4 px-5">
            <button
              className="rounded-md border border-white/50 px-6 py-2"
              onClick={() => {
                setShowMemberUI(false);
              }}
            >
              <p className="text-sm">Cancel</p>
            </button>
            <button
              className={`ml-2 flex items-center gap-1 rounded-md px-6 py-2`}
              onClick={() => {
                setShowMemberUI(false);
              }}
              // disabled={isTicket}
            >
              <p className="text-sm">Next</p>
              <ArrowForwardIcon color={"white"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCheckout;
