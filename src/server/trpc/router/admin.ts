import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

const specialAdmins = {
  agaash: "agaash@gmail.com",
  harnam: "harnam@gmail.com",
};

export const adminRouter = router({
  agaashViewAccomodation: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.email !== specialAdmins.agaash) return;

    return await ctx.prisma.accomodation.findMany();
  }),
  agaashMutateAccomodation: protectedProcedure
    .input(z.object({ id: z.string(), change: z.any() }))
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.email !== specialAdmins.agaash) return;

      const { id } = input;
      const acc = await ctx.prisma.accomodation.findMany({ where: { id } });

      // mutate accomodation with change here

      // return changed data
    }),
  harnamViewPayments: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.email !== specialAdmins.harnam) return;

    return await ctx.prisma.payment.findMany();
  }),
});
