import { z } from "zod";
import * as fs from "node:fs/promises";
import os from "os";
import path from "path";

import OCR from "../../../lib/ocr";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

type costType = [number, number];

export const travelCheckoutRouter = router({
	handleTravelCheckout: protectedProcedure
		.input(
			z.object({
				location: z.number().min(0).max(2),
				seater: z.number().min(0).max(1),
			}))
		.mutation(async ({ ctx, input }) => {
			const { location, seater } = input;
			
			let amount = 875;
			const cost: costType[] = [
				[875, 1350], // Botanical Gardens
				[975, 1550], // Connaught Place
				[1575, 2350], // IGI Airport
			];
			amount = cost[location]?.[seater] ?? 875;
			
			const { id: userId } = ctx.session.user;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      if (!user) return;

      const ssDir = path.join(os.homedir(), "screenshots");

      const ssFilename = (await fs.readdir(ssDir))
        .filter((ss) => ss.includes(userId))
        .sort()
        .reverse()[0];

      const UPI = (await OCR(ssDir + "/" + ssFilename))[0];
			
			console.log({ UPI });
			console.log({ ssFilename });
			
			await ctx.prisma.$transaction(async (tx) => {
        const userPayment = await tx.userPayment.create({
          data: {
            userId,
            upi: UPI ? UPI : "UPI NOT FOUND",
            url: ssFilename ? ssFilename : "FILE NOT FOUND",
          },
        });

        const eventPaymentItem = await tx.paymentItem.create({
          data: {
            userId,
            userPaymentId: userPayment.id,
            amount,
            state: "PROCESSING",
          },
				});
				
				// TODO: TRAVELLLLLLLLLLLLL
        
      });
		})
});
			
				