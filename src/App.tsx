import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Setting from "./pages/Setting";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      {/*//todo: App's Layout  */}
      <Header />

      {/*//todo: Set-up Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
