import { atom } from "jotai";
import { checkoutObject } from "../types";

export const checkoutAtom = atom<checkoutObject | null>(null);
