import { Gender } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";

export type Member = {
  name: string;
  phoneNumber: string;
  emailId: string;
  checkinDate: Date;
  checkoutDate: Date;
  isAccomodation: boolean;
  gender: Gender;
};

const useCheckout = () => {
  // TODO: get currently added members from DB via trpc and populate this
  const [members, setMembers] = useState<Member[]>([]);

  // -1 means new member, others mean editing some member
  const [isActive, setIsActive] = useState(-1);
  const addMember = (member: Member) => setMembers([...members, member]);

  const removeMember = (index: number) =>
    setMembers(members.filter((_, i) => i !== index));

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
  };
};

export default useCheckout;
