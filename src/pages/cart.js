import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import UserContect from "../context/UserContext";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {createOrder} from "../services/OrderService";

const Cart = () => {
  const [orderPlaceClicked, setOrderPlaceClicked] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { userData, isLogin }=useContext(UserContect);

  const [orderDetails, setOrderDetails] = useState({
    cartId: "",
    userId: "",
    orderStatus: "",
    paymentStatus: "",
    billingAddress: "",
    billingPhone: "",
    billingName: "",
  });

  const getTotalCartAmont = () => {
    let amount = 0;
    cart.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  const orderFormView = () => {
    return (
      <div>
        <Form>
          <h4 className="text-center">Fill the form and complete the order</h4>
          <Form.Group>
            <Form.Label>Billing Name</Form.Label>
            <Form.Control
              value={orderDetails.billingName}
              onChange={(event) => {
                setOrderDetails({
                  ...orderDetails,
                  billingName: event.target.value,
                });
              }}
              type="text"
              placeholder="Enter Here"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Billing Phone</Form.Label>
            <Form.Control  value={orderDetails.billingPhone}
              onChange={(event) => {
                setOrderDetails({
                  ...orderDetails,
                  billingPhone: event.target.value,
                });
              }} type="number" placeholder="Enter Here" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Billing Address</Form.Label>
            <Form.Control  value={orderDetails.billingAddress}
              onChange={(event) => {
                setOrderDetails({
                  ...orderDetails,
                  billingAddress: event.target.value,
                });
              }} as={"textarea"} rows={5} placeholder="Enter Here" />
          </Form.Group>
          <Container className="mt-3 text-center">
            <Button
              onClick={(event) => {
                handleOrdercreation();
              }}
              variant="success"
              size="sm"
            >
              Create Order & Proceed to Pay
            </Button>
          </Container>
        </Form>
      </div>
    );
  };

  //Handle Order Creation
  const handleOrdercreation = async () => {
    if(orderDetails.billingName.trim()===""){
      toast.info("Billing Name is required")
      return
    }
    if(orderDetails.billingPhone.trim()===""){
      toast.info("Billing phone is required")
      return
    }
    if(orderDetails.billingAddress.trim()===""){
      toast.info("Billing Address is required")
      return
    }

    orderDetails.cartId = cart.cartId;
    orderDetails.orderStatus='PENDING';
    orderDetails.paymentStatus='NOT_PAID';
    orderDetails.userId=userData.userId;

    try {
      const result = await createOrder(orderDetails);
      toast.success("Order Created Successfully");
      console.log(result);
      setCart({
        ...cart,
        items:[],
      })
    } catch (error) {
      toast.error("Error occuered during Ordering");
    }

  };

  const CartView = () => {
    return (
      <div>
        <Card className="mt-4 shadow">
          <Card.Body>
            <Row className="px-5">
              <Col>
                <h3>Cart</h3>
              </Col>
              <Col className="text-end">
                <h3>{cart.items.length} Items</h3>
              </Col>
            </Row>
            <Row className="px-5 mt-3">
              <Col>
                {cart.items.map((item) => (
                  <SingleCartItemView key={item.cartItemId} item={item} />
                ))}
              </Col>
            </Row>
            <Container className="px-5 mt-3">
              <h3 className="text-end px-1">
                Total Amount :₹{getTotalCartAmont()}
              </h3>
            </Container>
            <Container className="text-center">
              {!orderPlaceClicked && (
                <Button
                  onClick={(event) => {
                    setOrderPlaceClicked(true);
                  }}
                  size="lg"
                >
                  Place Order
                </Button>
              )}
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Container fluid={orderPlaceClicked} className="px-5">
      <Row>
        <Col md={orderPlaceClicked ? 8 : 12} className="animation">
          {cart &&
            (cart.items.length > 0 ? (
              CartView()
            ) : (
              <Alert variant="danger" className="mt-3 shadow-sm text-center">
                <h3>No Items in the Cart</h3>
                <p>Please go to Store and Add some Product to continue</p>
                <Button as={Link} to={"/store"} variant="info">
                  Add Product
                </Button>
              </Alert>
            ))}
          {!cart && (
            <Alert variant="success" className="mt-3 shadow-sm text-center">
              <h3>You are Not Logged In</h3>
              <p>In order to access your Cart Please Login First</p>
              <Button as={Link} to={"/login"} variant="info">
                Login
              </Button>
            </Alert>
          )}
        </Col>
        {orderPlaceClicked && (
          <Col md={4}>
            <Card className="mt-4 shadow">
              <Card.Body>{orderFormView()}</Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
