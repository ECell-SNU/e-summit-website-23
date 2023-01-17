import { atom } from "jotai";
import { CheckoutObject } from "../types";

export const checkoutAtom = atom<CheckoutObject | null>(null);
