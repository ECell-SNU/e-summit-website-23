import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const regRouter = router({
  regUser: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation((req) => {
      const { email } = req.input;

      // write prisma code to add email to db

      console.log(email);
    }),
  fillUserInfo: protectedProcedure
    .input(
      z.object({
        university: z.string(),
        fieldOfStudy: z.string(),
        yearOfStudy: z.string().regex(new RegExp("^[0-9]{4}$")),
        mobileNumber: z.string(),
      })
    )
    .mutation((req) => {
      const fillUserInfoInput = req.input;
      console.log({ fillUserInfoInput });
    }),
});
