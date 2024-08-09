import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../assets/logo.png"
import { NavLink } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <Navbar className="bg-navbar-color" collapseOnSelect expand="lg" y
     variant="dark">
      <Container>

        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="Logo" height={21} width={28}/>
          Electronic Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="m-auto">

            <Nav.Link as={NavLink} to="/services">Features</Nav.Link>
            <NavDropdown
              title="Product Categories"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                Electronics
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">Smart TV</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart">Cart(40)</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register" >SignUp</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
