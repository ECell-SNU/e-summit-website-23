import { useEffect, useState, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon, HamburgerIcon, CloseIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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
	const ref = useRef<HTMLDivElement>(null);
	const [showMobileNav, setShowMobileNav] = useState(false);
	
	useEffect(() => {
		if (showMobileNav) {
			disableBodyScroll(document.body);
		} else {
			enableBodyScroll(document.body);
		}
		
		window.addEventListener("scroll", () => {
			if (!ref.current || !ref.current.style) return;
			
      if (window.scrollY > 1) {
				ref.current.style.padding = "2rem 0";
      } else {
				ref.current.style.padding = "";
      }
    });
	}, [showMobileNav]);
	
	const menu = () => {
		return navItems.map(({ title, href, drop, dropItems }) => {
			return drop ? (
				<div className={`text-gray-400 
						${showMobileNav ? "text-3xl" : "text-lg"}
					`}
					key={title}>
					{/* blasphemy */}
					<Menu>
						<MenuButton _hover={{ textColor: "white" }}>
							{title}
							{showMobileNav ? <ChevronRightIcon color='white' /> : <ChevronDownIcon color='white' />}
						</MenuButton>
						<MenuList textColor="#FFF" borderRadius="0" bgColor="black">
							{dropItems.map((dropItem, index) => (
								<Link href={dropItem.href} key={dropItem.title}>
									<MenuItem bgColor="black" py="0" justifyContent="space-between">
										{dropItem.title}
										<ArrowForwardIcon color='white' />
									</MenuItem>
									{index !== dropItems.length - 1 && <MenuDivider />}
								</Link>
							))}
						</MenuList>
					</Menu>
				</div>
			) : (
				<Link href={href ? href : ""} key={title}>
						<div className={` 
							hover:text-white cursor-pointer transition-all duration-300 ease-in-out
							${page === title ? " text-white" : " text-gray-400"}
							${showMobileNav ? "text-3xl" : "text-lg"}
						`}>
						{title}
					</div>
				</Link>
			);
		});
	};

  return (
		<nav
			className="flex h-[70px] items-center justify-between laptop:pt-6 lg:px-8 fixed top-0 left-0 w-full z-50 backdrop-blur-md"
			ref={ref}
		>
      <Link href="/">
        <div className="">
          <Image
						className="phone:ml-3 phone:w-28 object-contain mr-8"
						height={85}
            alt="E-Summit 2023"
            src={eSummitLogo}
          />
        </div>
      </Link>
      <div className="flex phone:hidden gap-8">
        {menu()}
      </div>
      <div className="item-center flex phone:hidden px-8">
				{sessionData ? (
					<Menu>
						<MenuButton _hover={{ textColor: "white" }}>
							<Avatar size="sm" name={(sessionData.user)?.name ?? ""} src={(sessionData.user)?.image ?? ""} />
						</MenuButton>
						<MenuList textColor="#FFF" borderRadius="0" bgColor="black">
							<Link href="/dashboard">
								<MenuItem bgColor="black" py="0" justifyContent="space-between">
									Edit Profile
								</MenuItem><MenuDivider />
							</Link>
							<MenuItem bgColor="black" py="0" justifyContent="space-between" onClick={() => signOut({ callbackUrl: "/" })}>
								Sign Out
							</MenuItem>
							
						</MenuList>
					</Menu>
				) : (
						<div
							className="cursor-pointer rounded-full bg-blue-500 px-7 py-1 transition-transform duration-300 ease-in-out hover:-translate-y-px text-lg"
							onClick={() => signIn("google")}
						>
							Sign in
						</div>
				)}
      </div>
      <div
        className="mr-6 cursor-pointer laptop:hidden"
        onClick={() => setShowMobileNav(true)}
      >
        <HamburgerIcon />
      </div>

      {/* mobile nav */}
      <div
				className={`
					flex flex-col w-full h-screen items-start justify-center gap-16 pl-12
					absolute top-0 bottom-0 left-0 right-0 z-40 backdrop-blur-md laptop:hidden
					${showMobileNav ? "" : "invisible"}
				`}>
				{menu()}
        <div
          className="fixed top-[20px] right-[30px] cursor-pointer text-3xl"
          onClick={() => setShowMobileNav(false)}>
          <CloseIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
