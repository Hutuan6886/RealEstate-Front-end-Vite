import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Setting from "@/pages/Setting";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Navbar from "@/components/navbar/Navbar";
function App() {
  return (
    <div className="w-full h-full px-4">
      <BrowserRouter>
        {/*//todo: App's Layout  */}
        <Navbar />
        {/*//todo: Set-up Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
