import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

import os from "os";
import path from "path";
import * as fs from "node:fs/promises";
import OCR from "../../../lib/ocr";
import mailWork from "../../../lib/mailwork";
import { Gender, Role, User } from "@prisma/client";

const a = z.object({
  teamName: z.string(),
  members: z
    .object({
      name: z.string(),
      emailId: z.string(),
      phoneNumber: z.string(),
      isAccomodation: z.boolean().optional(),
      checkinDate: z.date().optional(),
      checkoutDate: z.date().optional(),
    })
    .array(),
});

export const checkoutRouter = router({
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        teamName: z.string(),

        members: z
          .object({
            name: z.string().optional(),
            emailId: z.string().optional(),
            phoneNumber: z.string().optional(),
            isAccomodation: z.boolean().optional(),
            checkinDate: z.date().optional(),
            checkoutDate: z.date().optional(),
            gender: z.enum(["MALE", "FEMALE"]),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      const ssDir = path.join(os.homedir(), "screenshots");

      const ssFilename = (await fs.readdir(ssDir))
        .filter((ss) => ss.includes(userId))
        .sort()
        .reverse()[0];

      const UPI = (await OCR(ssDir + "/" + ssFilename))[0];

      const clusterMale = await ctx.prisma.cluster.findFirst({
        where: {
          gender: "MALE",
        },
      });

      const clusterFemale = await ctx.prisma.cluster.findFirst({
        where: {
          gender: "FEMALE",
        },
      });

      const eventName = user?.role;
      if (!eventName || !clusterFemale || !clusterMale) return;

      const event = await ctx.prisma.event.findFirst({
        where: {
          name: eventName,
        },
      });

      if (!event) return;

      // create a team
      const team = await ctx.prisma.team.create({
        data: {
          name: input.teamName,
          eventId: event.id,
        },
      });

      // update team for captain
      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          teamId: team.id,
        },
      });

      // create team members
      input.members.forEach(
        async (participant) =>
          await ctx.prisma.user.create({
            data: {
              name: participant.name,
              email: participant.emailId,
              mobileNumber: participant.phoneNumber,
              role: eventName,
              hasFilledInfo: true,
              teamId: team.id,
              gender: participant.gender,
            },
          })
      );

      // create global received payment
      const userPayment = await ctx.prisma.userPayment.create({
        data: {
          upi: UPI ?? "UPI NOT FOUND",
          url: ssFilename ?? "URL NOT FOUND",
          userId: userId,
        },
      });

      // create payment item for event
      const eventPaymentItem = await ctx.prisma.paymentItem.create({
        data: {
          userId,
          userPaymentId: userPayment.id,
          amount: event.amount,
          state: "PROCESSING",
        },
      });

      await ctx.prisma.eventReg.create({
        data: {
          userId,
          eventId: event.id,
          paymentId: eventPaymentItem.id,
        },
      });

      // create accomodations and payment items
      input.members.forEach(async (participant) => {
        if (
          participant.isAccomodation &&
          participant.checkoutDate &&
          participant.checkinDate
        ) {
          const days =
            participant.checkoutDate?.getDate() -
            participant.checkinDate?.getDate();
          const amount = 350 * days - (days - 1) * 50 - 1;

          const accomPayment = await ctx.prisma.paymentItem.create({
            data: {
              amount,
              state: "PROCESSING",
              userId,
              userPaymentId: userPayment.id,
            },
          });

          await ctx.prisma.accomodation.create({
            data: {
              userId: userId,
              clusterId:
                participant.gender == Gender.FEMALE
                  ? clusterFemale.id
                  : clusterMale.id,
              checkInDate: participant.checkinDate,
              checkOutDate: participant.checkoutDate,
              paymentId: accomPayment.id,
            },
          });
        }
      });
    }),
});
