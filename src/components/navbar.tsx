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
  {
    title: "More",
    drop: true,
    dropItems: [],
  },
];

const Navbar: React.FC = () => {
  return (
    <nav className="h-[10vh] bg-slate-400">
      <div className=""></div>
      <div className="flex">
        {navItems.map(({ title, href }) => (
          <div className="ml-8">{title}</div>
        ))}
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
