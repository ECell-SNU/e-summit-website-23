import { router } from "../trpc";
import { authRouter } from "./auth";
import { regRouter } from "./reg";
import { checkoutRouter } from "./checkout";
import { teamCheckoutRouter } from "./team-checkout";

export const appRouter = router({
  auth: authRouter,
  reg: regRouter,
  checkout: checkoutRouter,
  teamCheckout: teamCheckoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
