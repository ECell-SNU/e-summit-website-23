import { type NextPage } from "next";
import Image from "next/image";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

import splashImg from "../assets/splash.png";
import splashImgLeftUni from "../assets/splash-left-universe.png";
import splashImgRightUni from "../assets/splash-right-universe.png";

import RegBox from "../components/reg-box";

// Add this to every page to protect from users who haven't filled the form
export { default as getServerSideProps } from "../lib/serverProps";

import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="flex h-[90vh] w-screen items-center justify-between">
        <div className="select-none">
          <Image draggable={false} alt="" src={splashImgLeftUni} />
        </div>
        <div className="flex flex-col items-center pb-10">
          <div className="select-none">
            <Image draggable={false} alt="" src={splashImg} />
          </div>
          <RegBox />
        </div>
        <div className="select-none">
          <Image draggable={false} alt="" src={splashImgRightUni} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
