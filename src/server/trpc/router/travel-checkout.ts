import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const travelCheckoutRouter = router({
	handleTravelCheckout: protectedProcedure
		.input(
			z.object({
				location: z.number(),
				seater: z.number(),
			}))
		.mutation(async ({ ctx, input }) => {
			console.log(input);
			return "Hello";
		})
});
			
				