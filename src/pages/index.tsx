import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

// Add this to every page to protect from users who haven't filled the form
export { default as getServerSideProps } from "../lib/serverProps";

import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex h-[90vh] w-screen items-center justify-between">
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
      </div>
    </Layout>
  );
};

export default Home;
