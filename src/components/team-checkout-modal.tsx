import { useState, useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import { Input, Select, Checkbox } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import useCheckout, { type Member } from "../hooks/useCheckout";
import { type Gender } from "@prisma/client";

const TeamCheckoutModal = () => {
  const [member, setMember] = useState<Member>(
    isActive === -1
      ? {
          name: "",
          emailId: "",
          phoneNumber: "",
          gender: "MALE",
          isAccomodation: false,
          checkinDate: new Date(),
          checkoutDate: new Date(),
        }
      : (members[isActive] as Member)
  );

  useEffect(() => {
    console.log(member);
  }, [member]);

  const [showMemberUI, setShowMemberUI] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!ref.current || !ref.current.style) return;

      if (window.scrollY > 1) {
        ref.current.style.padding = "2rem 0";
      } else {
        ref.current.style.padding = "";
      }
    });
  }, []);

  useEffect(() => {
    if (showMemberUI) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [showMemberUI]);

  return (
    <div
      className={`
					absolute top-[7vh] bottom-0 left-0 right-0 z-40 flex h-[80vh]
					w-full items-center justify-center backdrop-blur-md sm:h-screen md:top-[10vh]
          md:h-[65vh]
					${showMemberUI ? "" : "invisible"}
				`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className=" z-60 relative flex h-full w-full flex-col border border-white/50 bg-black sm:w-[600px] sm:rounded-xl">
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
            {isActive === -1 ? "Add new member" : `Edit member #${isActive}`}
          </p>
        </div>
        <div className="my-1 h-full flex-col overflow-y-auto border-y-[1px] border-white/50 p-6">
          <div className="flepux-col flex-col gap-6 rounded-md bg-[#161616] p-4 text-left text-sm">
            <p className="text-xs text-white">Name</p>
            <Input
              style={{
                borderRadius: "12px",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              onChange={(e) => setMember({ ...member, name: e.target.value })}
              className="mt-1"
              variant="outline"
              placeholder="Full name"
            />

            <p className="mt-4 text-xs text-white">Email</p>
            <Input
              style={{
                borderRadius: "12px",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              onChange={(e) =>
                setMember({ ...member, emailId: e.target.value })
              }
              className="mt-1"
              variant="outline"
              placeholder="Email address"
            />

            <p className="mt-4 text-xs text-white">Phone number</p>
            <Input
              style={{
                borderRadius: "12px",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              onChange={(e) =>
                setMember({ ...member, phoneNumber: e.target.value })
              }
              className="mt-1"
              variant="outline"
              placeholder="Phone number"
            />

            <p className="mt-4 text-xs text-white">Gender</p>
            <Select
              style={{
                borderRadius: "12px",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              className="mt-1"
              variant="outline"
              placeholder="Gender"
              onChange={(e) =>
                setMember({ ...member, gender: e.target.value as Gender })
              }
            >
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </Select>

            {/* Team member accomodation */}

            <Checkbox
              mt={4}
              onChange={(e) =>
                setMember({ ...member, isAccomodation: e.target.checked })
              }
            >
              <p className="text-md mt-1 font-semibold text-white">
                Need Accomodation for this team member?
              </p>
            </Checkbox>
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
  );
};

export default TeamCheckoutModal;
