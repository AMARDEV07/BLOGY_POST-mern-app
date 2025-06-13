import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "./Images";
import {
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";




function Navbar() {
  //set menu 
  const [openMenu, setOpenMenu] = useState(false);
  //nevigate page
  const navigate = useNavigate();
//checking token form clerk
  const { getToken } = useAuth();
  const { signOut } = useClerk();



  
  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, [getToken]);




  const hamburgerHandler = () => {
    setOpenMenu((prev) => !prev);
  };




  const handleLogout = async () => {
    hamburgerHandler();
    await signOut();
    navigate("/");
  };




  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">


      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Images src="logo.png" className="rounded-2xl" alt="amanlogo" w={32} h={32} />
        <span>AmanBlog</span>
      </Link>


      {/* MOBILE MENU */}
      <div className="md:hidden">

        {/* Hamburger Menu Button */}
        <button className="cursor-pointer text-2xl p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"onClick={hamburgerHandler}aria-label="Toggle menu">
          {openMenu ? "✕" : "☰"}
        </button>
      
        {/* Mobile overlay */}
        <div className={`fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl flex flex-col items-center justify-center gap-8 text-lg font-medium z-50 transform transition-transform duration-300 ease-in-out ${  openMenu ? "translate-x-0" : "translate-x-full" }`} >
          <button className="absolute top-6 right-6 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"onClick={hamburgerHandler}aria-label="Close menu" > ✕ </button>
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
              to="/posts"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              All posts
            </Link>

            <Link
              to="/posts?sort=trending"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              Trending
            </Link>

            <Link
              to="/posts?sort=oldest"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              oldest
            </Link>

            <Link
              to="/write"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              Write
            </Link>
            
            <Link
              to="/about"
              className="py-3 px-6 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800 hover:text-black"
              onClick={hamburgerHandler}
            >
              About
            </Link>

            {/* Mobile Authentication */}
            <SignedOut>
              <Link to="/login" onClick={hamburgerHandler}>
                <button className="py-3 px-8 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium shadow-lg">
                  Login
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <button
                onClick={handleLogout}
                className="py-3 px-8 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium shadow-lg"
              >
                Logout
              </button>
            </SignedIn>
          </nav>
        </div>
      </div>



      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>

        {/* Use query parameters to match SideMenu */}
        <Link
          to="/posts?sort=trending"
          className="hover:text-blue-600 transition-colors"
        >
          Trending
        </Link>
        <Link
          to="/posts?sort=Popular"
          className="hover:text-blue-600 transition-colors"
        >
          Most Popular
        </Link>

        <Link to="/about" className="hover:text-blue-600 transition-colors">
          About
        </Link>

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-black text-white hover:bg-gray-800 transition-colors duration-200">
              Login
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>


    </div>
  );
}

export default Navbar;
