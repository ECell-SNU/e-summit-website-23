import { Role } from "@prisma/client";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

const specialAdmins = {
  agaash: "agaash@gmail.com",
  harnam: "harnam@gmail.com",
};

export const adminRouter = router({
  checkIfAdmin: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    return user !== null && user.role === Role.ADMIN;
  }),
  agaashViewAccomodation: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.email !== specialAdmins.agaash) return;

    return await ctx.prisma.accomodation.findMany();
  }),
  agaashMutateAccomodation: protectedProcedure
    .input(z.object({ id: z.string(), change: z.any() }))
    .query(async ({ ctx }) => {
      if (ctx.session.user.email !== specialAdmins.agaash) return;

      // const { id } = input;
      // const acc = await ctx.prisma.accomodation.findMany({ where: { id } });

      // mutate accomodation with change here

      // return changed data
    }),
  harnamViewPayments: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.email !== specialAdmins.harnam) return;

    return [];
  }),
  adminViewTickets: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;
    const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
    console.log({ user });
    if (user === null || user.role !== Role.ADMIN)
      return {
        isAdmin: false,
        totalAmount: 0,
        totalQuantity: 0,
      };

    // prisma sum quantity column in table EventReg
		// const totalQuantity = await ctx.prisma.eventReg.aggregate({
		// 	_sum: {
		// 		quantity: true,
		// 	},
		// });

    const totalAmount = await ctx.prisma.paymentItem.aggregate({
      _sum: {
        amount: true,
      },
    });
    totalAmount._sum.amount;

    return {
      isAdmin: true,
      // totalQuantity: totalQuantity._sum.quantity,
      totalAmount: totalAmount._sum.amount,
    };
	}),
	adminViewTeams: protectedProcedure.query(async ({ ctx }) => {
		const { id: userId } = ctx.session.user;
		const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
		
		if (user === null || user.role !== Role.ADMIN)
      return {
        isAdmin: false,
        totalAmount: 0,
        totalQuantity: 0,
			};
		
		const teams = await ctx.prisma.team.findMany({
			include: {
				User: true,
			},
		});
		return { isAdmin: true, teams };
	}),
  adminGetQrUserData: protectedProcedure
    .input(z.object({ qrUserId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { qrUserId } = input;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      console.log({ user });

      if (user === null || user.role !== Role.ADMIN) return { isAdmin: false };

      const qrUser = await ctx.prisma.user.findFirst({
        where: { id: qrUserId },
      });

      return { isAdmin: true, qrUser };
    }),
  adminCheckinParticipant: protectedProcedure
    .input(z.object({ userIdToCheckIn: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { userIdToCheckIn } = input;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });

      console.log({ user });

      if (user === null || user.role !== Role.ADMIN) return { isAdmin: false };

      const userToCheckIn = await ctx.prisma.user.findFirst({
        where: { id: userIdToCheckIn },
      });

      console.log({ userToCheckIn });

      return { isAdmin: true, userToCheckIn };
    }),
});
