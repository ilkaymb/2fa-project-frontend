// components/Header.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="bg-indigo-600 fixed w-full ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center py-4 md:py-5">
          <Link href="/" className="flex items-center">
            <h1 className="ml-3 text-white font-semibold text-2xl">2FA App</h1>
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <span className="sr-only">Menüyü aç</span>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          <nav
            className={` absolute top-full left-0 w-full bg-indigo-600 md:static md:w-auto md:bg-transparent ${
              isOpen ? "flex flex-col pb-4 pt-4 " : "hidden"
            } md:flex gap-1`}
          >
            <Link
              href="/"
              className="text-base font-medium text-white hover:text-indigo-50 mx-4  px-4 py-2 text-center"
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`text-base mx-4 font-medium text-white hover:bg-indigo-700 hover:text-white bg-white text-indigo-500  px-4 py-2 text-center rounded-full transition duration-300`}
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
