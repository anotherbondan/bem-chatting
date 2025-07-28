"use client";

import { Button } from "@/components/ui/button";
import useHasMounted from "@/hooks/useHasMounted";
import { AlignJustify, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  isScrolled: boolean;
};

const NavbarMobile = ({ isScrolled }: NavbarProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, [hasMounted]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!hasMounted) {
    return <nav className="h-16 bg-white" />;
  }

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <nav
      className={`fixed bg-white shadow-md px-6 py-3 flex flex-col justify-between items-center min-w-screen z-50 transition-shadow duration-300 ease-in-out ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="w-full flex justify-between">
        <div className="text-xl bg-gradient bg-clip-text font-bold">
          <a
            href="/"
            className="text-2xl max-lg:text-xl max-md:text-lg text-transparent"
          >
            BEM Chatting
          </a>
        </div>
        <button onClick={toggle} className="hover:cursor-pointer">
          {isOpened ? <X /> : <AlignJustify />}
        </button>
      </div>
      <div className="flex flex-col">
        <ul
          className={`flex flex-col justify-evenly text-md font-medium text-gray-700 items-center min-h-screen ${
            isOpened ? "block" : "hidden"
          }`}
        >
          <li>
            <a
              href="/"
              className="active:bg-clip-text active:bg-gradient-pressed active:text-transparent text-2xl font-roboto-flex"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href={isLoggedIn ? "/chats" : "/login"}
              className="active:bg-clip-text active:bg-gradient-pressed active:text-transparent text-2xl font-roboto-flex"
            >
              Chat
            </a>
          </li>
          <li>
            <a
              href="#"
              className="active:bg-clip-text active:bg-gradient-pressed active:text-transparent text-2xl font-roboto-flex"
            >
              Tentang
            </a>
          </li>
          <li>
            {isLoggedIn ? (
              <Button size="lg" onClick={handleLogout}>
                <div className="flex gap-1 items-center">
                  Log out
                  <LogOut />
                </div>
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log in
                </Button>
                <Button
                  size="custom"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  <div className="bg-white hover:bg-gray-50 active:bg-gray-100 w-full h-full rounded-lg text-stone-900 py-2.5 px-6 has-[>svg]:px-3">
                    Sign Up
                  </div>
                </Button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const NavbarDesktop = ({ isScrolled }: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, [hasMounted]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!hasMounted) {
    return <nav className="h-16 bg-white" />;
  }

  return (
    <nav
      className={`fixed bg-white shadow-md px-6 py-3 flex justify-between items-center min-w-screen z-50 transition-shadow duration-300 ease-in-out ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="text-xl bg-gradient bg-clip-text font-bold">
        <a
          href="/"
          className="text-2xl max-lg:text-xl max-md:text-lg text-transparent"
        >
          BEM Chatting
        </a>
      </div>
      <ul className="flex gap-14 max-lg:gap-6 text-md font-medium text-gray-700">
        <li>
          <a
            href="/"
            className="hover:bg-gradient hover:text-transparent hover:bg-clip-text active:bg-gradient-pressed active:bg-clip-text"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href={isLoggedIn ? "/chats" : "/login"}
            className="hover:bg-gradient hover:text-transparent hover:bg-clip-text active:bg-gradient-pressed active:bg-clip-text"
          >
            Chat
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:bg-gradient hover:text-transparent hover:bg-clip-text active:bg-gradient-pressed active:bg-clip-text"
          >
            Tentang
          </a>
        </li>
      </ul>
      {isLoggedIn ? (
        <Button onClick={handleLogout}>
          <div className="flex gap-1 items-center">
            Log out
            <LogOut />
          </div>
        </Button>
      ) : (
        <div className="flex gap-1">
          <Button
            onClick={() => {
              router.push("/login");
            }}
          >
            Log in
          </Button>
          <Button
            size="custom"
            onClick={() => {
              router.push("/register");
            }}
          >
            <div className="bg-white hover:bg-gray-50 active:bg-gray-100 w-full h-full rounded-lg text-stone-900 py-1.5 px-4 has-[>svg]:px-3">
              Sign Up
            </div>
          </Button>
        </div>
      )}
    </nav>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <NavbarMobile isScrolled={scrolled} />
  ) : (
    <NavbarDesktop isScrolled={scrolled} />
  );
};

export default Navbar;
