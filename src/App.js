import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Dashboard from "./pages/users/Dashboard";
import Profile from "./pages/users/Profile";
import AboutUser from "./pages/users/AboutUser";
import CustomNavbar from "./components/Navbar";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthCallback from "./auth/OAuthCallback";
import Home from "./pages/users/Home";
import Order from "./pages/users/Order";
import UserProvider from "./context/UserProvider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import ViewCategories from "./pages/admin/ViewCategory";
import AddCategory from "./pages/admin/AddCategory";
import ViewProducts from "./pages/admin/ViewProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";

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
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="about" element={<AboutUser />} />
            <Route path="orders" element={<Order />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-category" element={<AddCategory/> }/>
            <Route path="categories" element={<ViewCategories/> }/>
            <Route path="products" element={<ViewProducts/> }/>
            <Route path="orders" element={<AdminOrders/> }/>
            <Route path="users" element={<AdminUsers/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
