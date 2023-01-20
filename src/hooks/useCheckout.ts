import { Gender } from "@prisma/client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { z } from "zod";

export type Member = {
  name: string;
  phoneNumber: string;
  emailId: string;
  aadharNumber: string;
  checkinDate: Date;
  checkoutDate: Date;
  isAccomodation: boolean;
  gender: Gender;
};

export enum TeamCheckoutState {
  MEMBER_INFO,
  OVERALL,
  PAYMENT,
}

export interface CheckoutState {
  addMember: (member: Member) => void;
  removeMember: (index: number) => void;
  editMember: (member: Member, index: number) => void;
  members: Member[];
  isActive: number;
  setIsActive: Dispatch<SetStateAction<number>>;
  checkoutState: TeamCheckoutState;
  setCheckoutState: Dispatch<SetStateAction<TeamCheckoutState>>;
}

const useCheckout = () => {
  // TODO: get currently added members from DB via trpc and populate this
  const [members, setMembers] = useState<Member[] | any>([
    { name: "Somesh Kar" },
    { name: "Pratham Aggarwal" },
    { name: "Prabhav Pandey" },
  ]);
  const [checkoutState, setCheckoutState] = useState<TeamCheckoutState>(
    TeamCheckoutState.MEMBER_INFO
  );
  // -1 means new member, others mean editing some member
  const [isActive, setIsActive] = useState(-1);
  const addMember = (member: Member) => setMembers([...members, member]);

  const removeMember = (index: number) =>
    setMembers(members.filter((_: any, i: number) => i !== index));

  const editMember = (member: Member, index: number) => {
    const newMembers = [...members];
    newMembers[index] = member;
    setMembers(newMembers);
  };

  return {
    addMember,
    removeMember,
    editMember,
    members,
    isActive,
    setIsActive,
    checkoutState,
    setCheckoutState,
  };
};

export default useCheckout;
