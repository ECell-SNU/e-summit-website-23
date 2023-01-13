import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

import { CheckoutObject } from "../../../types/index";

export const checkoutRouter = router({
  isSNU: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.email?.endsWith("snu.edu.in")) {
      return true
    }

    return false
  }),
  currentStatus: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.
  }),
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        isAccomodation: z.boolean(),
        gender: z.enum(["MALE", "FEMALE"]),
        checkinDate: z.date(),
        checkoutDate: z.date(),
        travel: z.object({
          destination: z.string(),
          departureDateAndTime: z.date(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;

      // await ctx.prisma.paymentItem.create({ data: {} })
    }),
});
