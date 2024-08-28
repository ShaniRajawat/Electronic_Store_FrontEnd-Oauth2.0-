import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { IoReorderFour } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";


const SideMenu =()=>{
    return (<>
    <ListGroup variant="flush" className="shadow">
        <ListGroupItem className="border border-0" as={NavLink} to="/admin/home" action>
            <GrHome size={20} />
            <span className="ms-2">Home</span>
        </ListGroupItem>
        <ListGroupItem className="border border-0" as={NavLink} to="/admin/add-category" action>
            <BiCategory size={20}/>
            <span className="ms-2">Add Category</span>
        </ListGroupItem>
        <ListGroupItem className="border border-0" as={NavLink} to="/admin/categories" action>
        <MdOutlineCategory size={20} />
            <span className="ms-2">View Categories</span>
        </ListGroupItem>
        <ListGroupItem className="border border-0" as={NavLink} to="/admin/add-product" action>
        <AiFillProduct size={20} />
            <span className="ms-2">Add Products</span>
        </ListGroupItem>
        <ListGroupItem className="border border-0" as={NavLink} to="/admin/products" action>
        <AiOutlineProduct size={20} />
            <span className="ms-2">View Products</span>
        </ListGroupItem>
        <ListGroupItem className="border border-0" as={NavLink} to="/admin/orders" action>
        <IoReorderFour size={20} />
            <span className="ms-2">Orders</span>
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/admin/users" className="d-flex justify-content-between align-iterm-start border border-0" action>
            <div>
                <FaRegUser size={20} />
                <span className="ms-2">Users</span>
            </div>
            <Badge bg="primary" pill>
                14
            </Badge>
        </ListGroupItem>
        <ListGroupItem className="border border-0" as={NavLink} to="/users/home" action>
        <AiFillDashboard size={20} />
            <span className="ms-2">DashBoard</span>
        </ListGroupItem>
        <ListGroupItem className="border border-0" action>
        <IoIosLogOut size={20} />
            <span>Logout</span>
        </ListGroupItem>
    </ListGroup>
    </>)
}

export default SideMenu;