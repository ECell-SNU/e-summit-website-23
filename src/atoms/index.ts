import { atom, useAtom } from "jotai";
import { CheckoutObject } from "../types";

export const checkoutAtom = atom<CheckoutObject | null>(null);

export const showTicketAtom = atom<boolean>(false);
