import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

import { Event, Role } from "@prisma/client";

export const teamRegisterRouter = router({
  isEvent: publicProcedure.query(async ({ ctx }): Promise<Role> => {
    if (!ctx.session) return Role.USER;
    const id = ctx.session.user?.id;
    const user = await ctx.prisma.user.findFirst({
      where: { id },
    });
    return user?.role || Role.USER;
  }),
  handleRegisterTeam: protectedProcedure
    .input(
      z.object({
        teamName: z.string(),
        members: z
          .object({
            name: z.string(),
            email: z.string(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return false;
      const members = input.members.reverse();
      members.pop();
      console.log({ members });
      const eventName = user.role;
      const event: Event | null = await ctx.prisma.event.findFirst({
        where: {
          name: eventName,
        },
      });
      if (!event) return false;

      const team = await ctx.prisma.team.create({
        data: {
          name: input.teamName,
          eventId: event.id,
        },
      });

      members.forEach(
        async (member) =>
          await ctx.prisma.user.upsert({
            where: {
              email: member.email,
            },
            update: {
              teamId: team.id,
              role: Role.HACKATHON,
            },
            create: {
              name: member.name,
              email: member.email,
              teamId: team.id,
              role: Role.HACKATHON,
            },
          })
      );

      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          teamId: team.id,
        },
      });
      return team;
    }),
});
