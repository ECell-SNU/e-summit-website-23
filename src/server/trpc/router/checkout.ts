import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

import { CheckoutObject } from "../../../types/index";

export const checkoutRouter = router({
  isSNU: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user.email?.endsWith("snu.edu.in");
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
        isAccomodation: z.boolean(),
        checkinDate: z.date(),
        checkoutDate: z.date(),
        travel: z.object({
          destination: z.string(),
          departureDateAndTime: z.date(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isSNU = ctx.session.user.email?.endsWith("snu.edu.in");

      const { id: userId } = ctx.session.user;

      // rewrite this to handle actual checkout (take in accomodation and travel info)
      // also, make separate route for event checkout
      const paymentItem = await ctx.prisma.paymentItem.create({
        data: { state: "NOT_REG", amount: isSNU ? 600 : 800, userId },
      });

      return {
        paymentItemId: paymentItem.id,
      };
    }),
});
