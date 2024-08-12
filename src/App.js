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
import Home from "./pages/users/home";
import Order from "./pages/users/order";
import UserProvider from "./context/user.provider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";

function App() {
  return (
    //setting up route
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/callback" element={<OAuthCallback />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/users" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<AboutUser />} />
            <Route path="orders" element={<Order />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
