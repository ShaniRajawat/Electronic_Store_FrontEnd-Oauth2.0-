import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../services/helper.service";
import defaultIMage from "../../assets/logo.png";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

const SingleCartItemView = ({ item }) => {
  const { removeItem, addItem } = useContext(CartContext);

  return (
    <Card style={{ backgroundColor: "#e2e2e2" }} className="mt-2">
      <Card.Body className="shadow">
        <Row>
          <Col
            md={2}
            className="d-flex justify-items-center align-items-center"
          >
            <img
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
              }}
              src={getProductImageUrl(item.product?.productId)}
              onError={(event) => {
                event.currentTarget.setAttribute("src", defaultIMage);
              }}
            />
          </Col>
          <Col md={8}>
            <h5>{item.product.title}</h5>
            <Row>
              <Col>
                <p>
                  <b>{item.quantity}</b>
                  <span className="'text-muted">Quantity</span>
                </p>
              </Col>
              <Col>
                <p>
                  <span className="'text-muted">Price</span>
                  <b>₹{item.product.discountedPrice}</b>
                </p>
              </Col>
              <Col>
                <p>
                  <span className="'text-muted">Total Price</span>
                  <b>₹{item.totalPrice}</b>
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-items-center"
          >
            <div className="w-100">
              <div className="d-grid">
                <Button
                  onClick={(event) => {
                    removeItem(item.cartItemId);
                  }}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
              <div className="mt-2">
                <Row>
                  <Col className="d-grid">
                    <Button
                      onClick={(event) => {
                        const quantityInc = item.quantity + 1;
                        if (quantityInc > 0) {
                          addItem(quantityInc, item.product.productId, ()=>{toast.info("Quantity Updated")});
                        } else {
                          toast.error("Quantity Can't be less than 1");
                        }
                      }}
                      size="sm"
                    >
                      +
                    </Button>
                  </Col>
                  <Col className="d-grid">
                    <Button
                      onClick={(event) => {
                        const quantityDec = item.quantity - 1;
                        if (quantityDec > 0) {
                          addItem(quantityDec, item.product.productId,()=>{toast.info("Quantity Updated")});
                        } else {
                          toast.error("Quantity Can't be less than 1");
                        }
                      }}
                      size="sm"
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
