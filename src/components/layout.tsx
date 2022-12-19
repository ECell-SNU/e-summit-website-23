import { type ReactNode } from "react";
import Head from "next/head";

import Navbar from "./navbar";

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | E-Summit 2023` : "E-Summit 2023"}</title>
        <meta
          name="description"
          content="Official website for E-Cell's annual event, E-Summit 2023"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
