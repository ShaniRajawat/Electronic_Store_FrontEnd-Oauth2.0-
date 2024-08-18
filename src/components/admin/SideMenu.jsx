import { ListGroup, ListGroupItem } from "react-bootstrap";

const SideMenu =()=>{
    return (<>
    <ListGroup>
        <ListGroupItem action> Home </ListGroupItem>
        <ListGroupItem action> Add Category </ListGroupItem>
        <ListGroupItem action> View Categories </ListGroupItem>
        <ListGroupItem action> Add Products </ListGroupItem>
        <ListGroupItem action> View Products </ListGroupItem>
        <ListGroupItem action> Orders </ListGroupItem>
        <ListGroupItem action> Users </ListGroupItem>
        <ListGroupItem action> DashBoard </ListGroupItem>
        <ListGroupItem action> Logout </ListGroupItem>
    </ListGroup>
    </>)
}

export default SideMenu;