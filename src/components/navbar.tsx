import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
    dropItems: [
      {
        title: "Startupverse",
        href: "/events/startupverse",
      },
      {
        title: "My Story",
        href: "/events/my-story",
      },
      {
        title: "Ideathon",
        href: "/events/ideathon",
      },
      {
        title: "Hackathon",
        href: "/events/hackathon",
      },
      {
        title: "StartupXpo",
        href: "/events/hackathon",
      },
    ],
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
  const { data: sessionData } = useSession();

  return (
    <nav className="flex h-[10vh] items-center justify-between">
      <div className="">
        <Image alt="E-Summit 2023" src={eSummitLogo} />
      </div>
      <div className="flex">
        {navItems.map(({ title, href, drop, dropItems }) => {
          return drop ? (
            <div className="ml-8 text-gray-400">
              {/* blasphemy */}
              <Menu>
                <MenuButton _hover={{ textColor: "white" }}>
                  {title} <ChevronDownIcon />
                </MenuButton>
                <MenuList textColor="#000">
                  {dropItems.map((dropItem) => (
                    <Link href={dropItem.href}>
                      <MenuItem>{dropItem.title}</MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
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
        {/* <div>Login</div> */}
        <div
          className="mx-8 cursor-pointer rounded-full bg-blue-500 px-7 py-3 transition-transform duration-300 ease-in-out hover:-translate-y-px"
          onClick={sessionData ? () => signOut() : () => signIn("google")}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
