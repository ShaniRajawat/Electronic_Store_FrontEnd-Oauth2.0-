import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import Cart from "./pages/cart";
import Dashboard from "./pages/users/dashboard";
import Profile from "./pages/users/profile";
import AboutUser from "./pages/users/aboutuser";
import CustomNavbar from "./components/Navbar";
import Contact from "./pages/contact";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/signup";
import OAuthCallback from "./auth/OAuthCallback";
import home from "./pages/users/home";

function App() {
  return (
    //setting up route
    <BrowserRouter>
      <ToastContainer
      position="bottom-center"
      />
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/callback" element={<OAuthCallback/>} />
        <Route path="/Register" element={<Register/>}/>
        <Route path="/users" element={<Dashboard />}>
          <Route path="home" element={<home/>}/>
          <Route path="profile" element={<Profile />} />
          <Route path="aboutuser" element={<AboutUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
