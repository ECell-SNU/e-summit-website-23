import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const accommodationCheckoutRouter = router({
	handleAccommodationCheckout: protectedProcedure
		.input(
			z.object({
				checkinDate: z.date(),
				checkoutDate: z.date(),
			}))
		.mutation(async ({ ctx, input }) => {
			console.log(input);
			return "Hello";
		})
});
			
