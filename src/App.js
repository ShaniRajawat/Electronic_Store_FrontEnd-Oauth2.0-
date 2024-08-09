import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import Cart from "./pages/cart";
import Dashboard from "./pages/users/dashboard";
import Profile from "./pages/users/profile";
import AboutUser from "./pages/users/aboutuser";
import CustomNavbar from "./components/Navbar"
import Contact from "./pages/contact"

function App() {
  return (
    //setting up route
    <BrowserRouter>
      <CustomNavbar/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="aboutuser" element={<AboutUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
