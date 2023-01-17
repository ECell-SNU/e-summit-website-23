import { atom, useAtom } from "jotai";
import { CheckoutObject } from "../types";

type CheckoutState = CheckoutObject & { aadharCardNumber: string };

const initialCheckoutState: CheckoutState = {
  aadharCardNumber: "",
  isAccommodation: false,
  // checkinDate,
  // checkoutDate
  travel: [],
};

export const checkoutAtom = atom<CheckoutObject>(initialCheckoutState);

export const showTicketAtom = atom<boolean>(false);
