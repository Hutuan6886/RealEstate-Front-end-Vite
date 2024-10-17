
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MainNav from "./MainNav";
import AvatarNav from "./AvatarNav"
import { Button } from "@/components/ui/button";
import {
  IoMenu
} from "react-icons/io5";
import { RootState } from "@/redux/store";
import SideBar from "./SideBar";
import SearchField from "@/components/search-field/search-field";

const Navbar = () => {
  const [isSideBar, setIsSidebar] = useState<boolean>(false)

  const location = useLocation()

  //todo: Redux
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <nav className="relative w-full bg-white py-3">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="flex flex-row items-center justify-start gap-5">
          <Link to="/" className="text-bold text-2xl md:text-3xl">
            HuuTuan
          </Link>
          <MainNav className="hidden lg:flex flex-row items-center justify-start gap-3" />
        </div>
        {location.pathname === "/search" ? <SearchField className="w-full z-10" placeholder="Search for Village's name or City in Vietnam" /> : null}
        <div className="hidden md:flex flex-row items-center justify-end gap-5">
          <div className="hidden lg:flex flex-row items-center">
            <Link to='/saved-homes'><Button variant='nav'>Saved Homes</Button></Link>
          </div>
          <div className="hidden lg:flex flex-row flex-nowrap items-center">
            {!currentUser.id ?
              <>
                <Link to='/register'><Button variant='ghost'> Register</Button></Link>
                <Link to='/log-in'><Button variant='login'> Log In</Button></Link>
              </> :
              <AvatarNav />
            }
          </div>
        </div>
        <Button variant="ghost" className="block lg:hidden text-xl hover:bg-transparent"
          onClick={() => { setIsSidebar(!isSideBar) }}
        ><IoMenu /></Button>
      </div>
      {/* //todo"sidebar */}
      <SideBar visible={isSideBar} closeSideBar={() => { setIsSidebar(false) }} currentUser={currentUser} />
    </nav>
  );
};

export default Navbar;
