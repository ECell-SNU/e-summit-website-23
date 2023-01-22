import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

import { Role } from "@prisma/client";

export const teamRegisterRouter = router({
  isEvent: publicProcedure.query(async ({ ctx }): Promise<Role> => {
    if (!ctx.session) return Role.USER;
    const id = ctx.session.user?.id;
    const user = await ctx.prisma.user.findFirst({
      where: { id },
    });
    console.log(user);
    return user?.role || Role.USER;
  }),
  handleInitialCheckout: protectedProcedure
    .input(
      z.object({
        isAccomodation: z.boolean().optional(),
        checkinDate: z.date().optional(),
        checkoutDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isSNU = ctx.session.user.email?.endsWith("snu.edu.in");

      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return;
    }),
});
