import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/navbar/Navbar";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/components/private-route/profile/Profile"
import Management from "@/components/private-route/management/Management"
import PrivateRoute from "@/components/private-route/PrivateRoute";
import EditListing from "@/components/private-route/management/EditListing";
import SavedHomes from "./components/private-route/SavedHomes/SavedHomes";
import ListingContent from "@/components/listing-content/ListingContent";
import Footer from "@/components/footer/Footer";

function App() {
  return (
    <div className="relative w-full h-full px-4">
      <BrowserRouter>
        <Toaster />
        {/*//todo: App's Layout  */}
        <div className="fixed z-20 top-0 left-0 w-full">
          <Navbar />
        </div>
        {/*//todo: Set-up Routes */}
        <div className="relative flex flex-col mt-[75px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listing/:listingId" element={<ListingContent />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/management" element={<Management />}></Route>
              <Route path="/management/:listingId" element={<EditListing />}></Route>
              <Route path="/saved-homes" element={<SavedHomes />}></Route>
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
