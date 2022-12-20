import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

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

  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <nav className="flex h-[10vh] items-center justify-between">
      <Link href="/">
        <div className="">
          <Image
            className="phone:ml-3 phone:w-28"
            alt="E-Summit 2023"
            src={eSummitLogo}
          />
        </div>
      </Link>
      <div className="flex phone:hidden">
        {navItems.map(({ title, href, drop, dropItems }) => {
          return drop ? (
            <div className="ml-8 text-gray-400" key={title}>
              {/* blasphemy */}
              <Menu>
                <MenuButton _hover={{ textColor: "white" }}>
                  {title} <ChevronDownIcon />
                </MenuButton>
                <MenuList textColor="#000">
                  {dropItems.map((dropItem) => (
                    <Link href={dropItem.href} key={dropItem.title}>
                      <MenuItem>{dropItem.title}</MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            </div>
          ) : (
            <Link href={href ? href : ""} key={title}>
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
      <div className="item-center flex items-center phone:hidden">
        {/* <div>Login</div> */}
        <div
          className="mx-8 cursor-pointer rounded-full bg-blue-500 px-7 py-3 transition-transform duration-300 ease-in-out hover:-translate-y-px"
          onClick={
            sessionData
              ? () => signOut({ callbackUrl: "/" })
              : () => signIn("google")
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </div>
      </div>

      <div
        className="mr-6 cursor-pointer laptop:hidden"
        onClick={() => setShowMobileNav(true)}
      >
        <HamburgerIcon />
      </div>

      {/* mobile nav */}
      <div
        className={
          `${
            showMobileNav ? "" : "invisible "
          }absolute top-0 bottom-0 left-0 right-0 z-40 bg-black bg-opacity-80 laptop:hidden`
          // showMobileNav
          //   ? ""
          //   : " invisible"
        }
      >
        {navItems.map(({ title, href, drop, dropItems }) => {
          return drop ? (
            <div
              className="mt-16 ml-10 cursor-pointer select-none text-3xl text-gray-400"
              key={title}
            >
              <Menu>
                <MenuButton _hover={{ textColor: "white" }}>
                  {title} <ChevronDownIcon />
                </MenuButton>
                <MenuList textColor="#000">
                  {dropItems.map((dropItem) => (
                    <Link href={dropItem.href} key={dropItem.title}>
                      <MenuItem>{dropItem.title}</MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            </div>
          ) : (
            <Link href={href ? href : ""} key={title}>
              <div
                className={
                  "mt-16 ml-10 cursor-pointer select-none text-3xl" +
                  (page === title ? " text-white" : " text-gray-400")
                }
              >
                {title}
              </div>
            </Link>
          );
        })}

        <div
          className="absolute bottom-20 left-[47vw] cursor-pointer text-3xl"
          onClick={() => setShowMobileNav(false)}
        >
          <CloseIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
