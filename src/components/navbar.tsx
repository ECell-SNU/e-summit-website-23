import Image from "next/image";
import Link from "next/link";

import eSummitLogo from "../assets/e-summit-logo.png";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Events",
    drop: true,
    dropItems: [],
  },
  {
    title: "Contact",
    href: "/contact",
  },
  // {
  //   title: "More",
  //   drop: true,
  //   dropItems: [],
  // },
];

interface NavbarProps {
  page?: string;
}

const Navbar: React.FC<NavbarProps> = ({ page }) => {
  // const activeStyle = page ? " text-white" : " text-gray-500";

  return (
    <nav className="flex h-[10vh] items-center justify-between">
      <div className="">
        <Image alt="E-Summit 2023" src={eSummitLogo} />
      </div>
      <div className="flex">
        {/* {navItems.map(({ title, href }) => (
          <div className="ml-8">{title}</div>
        ))} */}
        {navItems.map(({ title, href, drop }) => {
          return drop ? (
            // TODO: make the dropdown here
            <div>
              <div className="ml-8 text-gray-400">{title}</div>
            </div>
          ) : (
            <Link href={href ? href : ""}>
              <div
                className={
                  "ml-8" + (page === title ? " text-white" : " text-gray-400")
                }
              >
                {title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="item-center flex items-center">
        <div>Login</div>
        <div className="mx-8 cursor-pointer rounded-full bg-blue-500 px-7 py-3 transition-transform duration-300 ease-in-out hover:-translate-y-px">
          Sign up
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
