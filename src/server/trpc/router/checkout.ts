import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

import { CheckoutObject } from "../../../types/index";
import { transformValue } from "superjson/dist/transformer";

export const checkoutRouter = router({
  isSNU: publicProcedure.query(({ ctx }) => {
    return ctx?.session?.user?.email?.endsWith("snu.edu.in") ?? false;
  }),
  currentStatus: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    try {
      const paymentItems = await ctx.prisma.paymentItem.findMany({
        where: { userId },
      });

      if (paymentItems.length !== 0) {
        return paymentItems[paymentItems.length - 1]?.state;
      }
    } catch (e) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "You have not initiated any payments yet.",
        cause: e,
      });
    }
  }),
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        isAccomodation: z.boolean().optional(),
        checkinDate: z.date().optional(),
        checkoutDate: z.date().optional(),
        travel: z
          .object({
            destination: z.string(),
            departureDateAndTime: z.date(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isSNU = ctx.session.user.email?.endsWith("snu.edu.in");

      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      // rewrite this to handle actual checkout (take in accomodation and travel info)
      // also, make separate route for event checkout

      if (!user) return;
      let success = false;

      const { isAccomodation, travel, checkinDate, checkoutDate } = input;

      // event for sure
      const event = isSNU
        ? await ctx.prisma.event.findFirst({ where: { name: "SNU-ESUMMIT" } })
        : await ctx.prisma.event.findFirst({
            where: { name: "NONSNU-ESUMMIT" },
          });

      const cluster = await ctx.prisma.cluster.findFirst({
        where: {
          gender: user.gender,
        },
      });

      if (!cluster || !event) return;

      ctx.prisma.$transaction(async (tx) => {
        const eventPaymentItem = await tx.paymentItem.create({
          data: {
            userId,
            amount: event.amount,
            state: "PROCESSING",
          },
        });

        // add cluster and travel into the payment transaction
      });

      return success;
    }),
});
