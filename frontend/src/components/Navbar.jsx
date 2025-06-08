import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Images from "./Images";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";


function Navbar() {
  const [openMenu, setopenMenu] = useState(false);
  const {getToken}=useAuth();



useEffect(()=>{
  getToken().then(token=>console.log(token))
},[])




  const HambrugerHandler = () => {
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
        <div className="cursor-pointer text-2xl" onClick={HambrugerHandler}>{openMenu ? "X" : "  ☰"} </div>

        {/* MOBILE LINKS  */}
        <div
          className={` w-full h-screen bg-gray-200 flex flex-col items-center justify-center gap-8 text-lg font-medium fixed top-16 transition-all ease-in-out 
                    ${openMenu ? "-right-0" : "-right-[100%]"}`}
        >
          <Link to="/">Home</Link>
          <Link to="/tranding">Tranding</Link>
          <Link to="/popular">Most Popupar</Link>
          <Link to="/about">about</Link>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              login
            </button>
          </Link>
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
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
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
