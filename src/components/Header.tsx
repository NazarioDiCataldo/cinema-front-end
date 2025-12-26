import { useId, type JSX } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Link, NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export type NavigationType = {
  title: string;
  href: string;
};

const navigation: NavigationType[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Actors",
    href: "/actors",
  },
  {
    title: "Movies",
    href: "/movies",
  },
  {
    title: "Halls",
    href: "/halls",
  },
];

const Header = () => {
  const id = useId(); //Hook che genera id

  function renderNavLink(element: NavigationType): JSX.Element {
    return (
      <NavLink
        to={element.href}
        className={({ isActive }) => {
          return cn(
            "cursor-pointer hover:text-blue-300 duration-300",
            isActive && "text-primary font-semibold underline"
          );
        }}
      >
        {element.title}
      </NavLink>
    );
  }

  return (
    <header className="border-b border-secondary">
      <div className="container p-4 flex items-center justify-between">
        <Link to={"/"} className="block size-12">
          <picture>
            <img
              className="w-full h-auto"
              src="./vite.svg"
              alt="Ritorna alla Homepage"
              title="Ritorna alla Homepage"
            />
          </picture>
        </Link>
        {/* Creo due menu, uno per mobile e uno per desktop */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline">
                <Menu />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="px-6 pt-16">
                <ul className="flex flex-col gap-6">
                  {navigation.map((element: NavigationType) => (
                    <li key={id + element.title}>
                      {renderNavLink(element)}
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-5">
            {navigation.map((element: NavigationType) => (
              <NavigationMenuItem
                key={id + element.title}
                className="cursor-pointer hover:text-blue-300 duration-300"
              >
                {renderNavLink(element)}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
