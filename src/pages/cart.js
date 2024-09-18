import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const getTotalCartAmont = () => {
    let amount = 0;
    cart.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  const CartView = () => {
    return (
      <div>
        <Card className="mt-5 shadow">
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
                  <SingleCartItemView item={item} />
                ))}
              </Col>
            </Row>
            <Container className="px-5 mt-3">
              <h3 className="text-end px-1">
                Total Amount :₹{getTotalCartAmont()}
              </h3>
            </Container>
            <Container className="text-center">
              <Button size="lg"> Place Order</Button>
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
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
      </Row>
    </Container>
  );
};

export default Cart;
