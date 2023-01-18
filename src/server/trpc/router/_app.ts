import { router } from "../trpc";
import { authRouter } from "./auth";
import { regRouter } from "./reg";
import { checkoutRouter } from "./checkout";

export const appRouter = router({
  auth: authRouter,
  reg: regRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
