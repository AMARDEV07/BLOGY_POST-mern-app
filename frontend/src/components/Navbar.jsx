import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Images from "./Images";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";


function Navbar() {
  const [openMenu, setopenMenu] = useState(false);
  const { getToken } = useAuth();



  useEffect(() => {
    getToken().then(token => console.log(token))
  }, [])




  const hamburgerHandler = () => {
    setopenMenu((prev) => !prev); //set prev value
  };








  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">


      {/* LOGO  */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        {/* Create component for images to reuse across app */}
        <Images
          src="logo.png"
          className="rounded-2xl"
          alt="amanlogo"
          w={32}
          h={32}
        />
        <span>AmanBlog</span>
      </Link>



      {/* MOBILE MENU */}

      <div className="md:hidden">

        {/* Hamburger Menu Button */}

        <button
          className="cursor-pointer text-2xl p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
          onClick={hamburgerHandler}
          aria-label="Toggle menu"
        >
          {openMenu ? "✕" : "☰"}
        </button>
        

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed top-0 left-0 w-full h-screen  bg-opacity-50 z-40 transition-opacity duration-300 ${openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={hamburgerHandler}
        />

        {/* Mobile Navigation Links */}
        <div
          className={`fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl flex flex-col items-center justify-center gap-8 text-lg font-medium z-50 transform transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={hamburgerHandler}
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-6 mt-8">
            <Link
              to="/"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              Trending
            </Link>
            <Link
              to="/popular"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              Most Popular
            </Link>
            <Link
              to="/about"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              About
            </Link>
            <Link
              to="/login"
              onClick={hamburgerHandler}
            >
              <button className="py-3 px-8 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium shadow-lg">
                Login
              </button>
            </Link>
          </nav>
        </div>
      </div>


      {/* DESKTOP MENU*/}
      <div className="hidden md:flex items-center gap-8 xl:gap-12  font-medium">
        <Link to="/">Home</Link>
        <Link to="/tranding">Tranding</Link>
        <Link to="/popular">Most Popupar</Link>
        <Link to="/about">about</Link>
        {/* //clerk component.... //signout */}
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-black text-white">
              login
            </button>
          </Link>
        </SignedOut>

        {/* //SignedIn */}

        <SignedIn>
          {/* user btn  */}
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
