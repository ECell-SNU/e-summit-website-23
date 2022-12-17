import { type ReactNode } from "react";
import Head from "next/head";

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
      {/* TODO: Navbar goes here */}
      <nav></nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
