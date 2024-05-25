
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import AvatarNav from "./AvatarNav"
import { Button } from "@/components/ui/button";
import {
  IoClose,
  IoMenu
} from "react-icons/io5";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const [isSideBar, setIsSidebar] = useState(false)

  //todo: Redux
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <nav className="relative w-full py-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="flex flex-row items-center justify-start gap-5">
          <Link to="/" className="text-bold text-2xl md:text-3xl">
            HuuTuan
          </Link>
          <MainNav className="hidden lg:flex flex-row items-center justify-start gap-3" />
        </div>
        <div className="hidden md:flex flex-row items-center justify-end gap-5">
          <div className=" flex flex-row items-center">
            <Button variant='nav'>Saved Homes</Button>
            <Button variant='nav'>Saved Searched</Button>
          </div>
          <div className="flex flex-row items-center">
            {!currentUser.id ? <>
              <Link to='/register'><Button variant='ghost'> Register</Button></Link>
              <Link to='/log-in'><Button variant='login'> Log In</Button></Link></> : <AvatarNav />
            }

          </div>
        </div>
        <Button variant="ghost" className="block lg:hidden text-xl hover:bg-transparent"
          onClick={() => { setIsSidebar(!isSideBar) }}
        ><IoMenu /></Button>
      </div>
      {/* //todo"sidebar */}
      {<div className={`fixed w-[60%] md:w-[40%] border-0 h-full bg-teal-700 rounded-l-[0.075rem] z-20 transition ${!isSideBar ? "top-0 -right-[60%] md:-right-[40%]" : "top-0 right-0"}`}>
        <div className="relative w-full h-full p-3">
          <Button variant='ghost' className="absolute top-1 left-1 bg-transparent hover:bg-transparent text-xl text-white" onClick={() => { setIsSidebar(!isSideBar) }}><IoClose /></Button>
          <div className="translate-y-16 flex flex-col items-start gap-4">
            <MainNav className="flex flex-col items-start text-white" />
            <div className="w-full flex flex-col items-center  gap-3">
              <Link className="w-full " to='/register'><Button variant='ghost' className="w-full font-semibold text-lg text-teal-700 bg-white"> Register</Button></Link>
              <Link className="w-full" to='/log-in'><Button variant='login' className="w-full font-semibold text-lg text-white bg-black hover:bg-black"> Log In</Button></Link>
            </div>
          </div>
        </div>
      </div>}
    </nav>
  );
};

export default Navbar;
