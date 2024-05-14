import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="w-full flex flex-row justify-between items-center gap-3 py-3">
        <div className="flex flex-row items-center justify-start gap-5">
          <Link to="/" className="text-bold text-3xl">
            HuuTuan
          </Link>
          <MainNav />
        </div>
        <div className=" flex flex-row items-center justify-end gap-5">
          <div className=" flex flex-row items-center">
            <Button variant='nav'>Saved Homes</Button>
            <Button variant='nav'>Saved Searched</Button>
          </div>
          <div className="flex flex-row items-center"><Button variant='ghost'> <Link to='/register'>Register</Link></Button>
            <Button variant='login'> <Link to='/log-in'>Log In</Link></Button></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
