import { Gender } from "@prisma/client";

type travelItem = {
  destination: string;
  departureDateAndTime: string;
};

export type checkoutObject = {
  isAccommodation: boolean;
  gender?: Gender;
  checkinDate?: Date;
  checkoutDate?: Date;
  travel: travelItem[];
};

export enum Status {
  NOT_REG,
  PROCESSING,
  FAILED,
  APPROVED,
}
