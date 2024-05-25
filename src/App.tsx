import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Setting from "@/pages/Setting";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute"
import Profile from "@/components/PrivateRoute/Profile/Profile"
import Management from "@/components/PrivateRoute/Management"

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
          <Route path="/about" element={<About />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/management" element={<Management />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
