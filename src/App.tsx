import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Setting from "@/pages/Setting";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Profile from "@/components/private-route/profile/Profile"
import Management from "@/components/private-route/management/Management"
import PrivateRoute from "@/components/private-route/PrivateRoute";
import ManagementListingId from "@/components/private-route/management/ManagementListingId";
import ListingContent from "@/components/listing-content/ListingContent";
import Buy from "@/pages/Buy";
import Search from "@/pages/Search";
// import Footer from "@/components/footer/Footer";

function App() {
  return (
    <div className="w-full h-full px-4">
      <BrowserRouter>
        <Toaster />
        {/*//todo: App's Layout  */}
        <Navbar />
        {/*//todo: Set-up Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing/:listingId" element={<ListingContent />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/management" element={<Management />}></Route>
            <Route path="/management/:listingId" element={<ManagementListingId />}></Route>
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
