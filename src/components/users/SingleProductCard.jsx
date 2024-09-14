import React from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../services/helper.service";
import defaultImage from "../../assets/logo.png";
import { Link } from "react-router-dom";

const SingleProductCard = ({ product }) => {
  return (
    <Card className="mb-3 shadow fixed-card">
      <Card.Body className="d-flex flex-column">
        <Container className="text-center">
          <img
            src={getProductImageUrl(product.productId)}
            style={{
              maxWidth: "100%",
              height: "200px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
            className="img-fluid"
            alt=""
            onError={(event) => {
              event.currentTarget.setAttribute("src", defaultImage);
            }}
          />
        </Container>
        <Container>
          <div style={{
              width: "100%",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }} className="d-flex justify-content-center align-items-center text-center" >
          <h5>{product.title}</h5>
          </div>
          <Badge pill>{product?.category?.title}</Badge>
          <Badge bg={product.stock ? "success" : "danger"} pill>
            {product.stock ? "In Stock" : "Out of Stock"}
          </Badge>
        </Container>

        <Container className="text-center mt-auto">
          <b>
            <span className="h4 text-muted">
              ₹<s>{product.price}</s>
            </span>
          </b>
          <b>
            <span className="h4 ms-2">₹{product.discountedPrice}</span>
          </b>
        </Container>
        <Container className="d-grid mt-2">
          <Button as={Link} to={`/store/products/${product.productId}`} className="" variant="success" size="sm">
            View Products
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;
