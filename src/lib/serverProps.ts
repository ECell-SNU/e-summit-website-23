import { type GetServerSidePropsContext } from "next";

import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function getServerSideProps(
  ctx: GetServerSidePropsContext
) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session) {
    // TODO: Check if hasFilledInfo is false in db using
    // prisma directly since this runs server side only
    const hasFilledInfo = false;

    if (!hasFilledInfo) {
      return {
        redirect: {
          destination: "/init-form",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
