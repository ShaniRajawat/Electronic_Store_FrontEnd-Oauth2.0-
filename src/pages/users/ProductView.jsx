import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/product.service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, Col, Row, Container, Badge, Button } from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/helper.service";
import defaultImage from "../../assets/logo.png";
import CartContext from "../../context/CartContext";

const ProductView = () => {
  const { addItem } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct(productId);
  }, []);

  const loadProduct = (productId) => {
    getSingleProduct(productId)
      .then((data) => setProduct(data))
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading the Product");
      });
  };

  const handleAddItem = (productId, quantity) => {
    addItem(quantity, productId, () => {
      toast.info("Producted is Added to Cart");
    });
  };

  const productView = () => {
    return (
      <Container className="py-4">
        <Row>
          <Col>
            <Card className="mt-4 border border-0 shadow">
              <Card.Body>
                <Container className=" text-center my-4">
                  <Row>
                    <Col>
                      <img
                        style={{
                          width: "500px",
                        }}
                        src={getProductImageUrl(product.productId)}
                        onError={(event) => {
                          event.currentTarget.setAttribute("src", defaultImage);
                        }}
                      />
                    </Col>
                    <Col className="mt-5">
                      <div
                        style={{
                          width: "100%",
                          height: "70px",
                          objectFit: "contain",
                          marginBottom: "20px",
                        }}
                        className="d-flex justify-content-center align-items-center text-center"
                      >
                        <h3>{product.title}</h3>
                      </div>
                      <Badge className="mt-3" pill>
                        {product?.category?.title}
                      </Badge>
                      <Badge
                        className="mt-3"
                        bg={product.stock ? "success" : "danger"}
                        pill
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </Badge>

                      <Container className="text-center mt-4">
                        <b>
                          <span className="h1 text-muted">
                            ₹<s>{product.price}</s>
                          </span>
                        </b>
                        <b>
                          <span className="h2 ms-2">
                            ₹{product.discountedPrice}
                          </span>
                        </b>
                      </Container>
                      <Container className=" d-grid mt-3">
                        <Button
                          onClick={(event) => {
                            handleAddItem(product.productId, 1);
                          }}
                          variant="success"
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          as={Link}
                          to={"/store"}
                          className="mt-3"
                          variant="info"
                          size="sm"
                        >
                          Go to Store
                        </Button>
                      </Container>
                    </Col>
                  </Row>
                </Container>
                <div>
                  <ShowHtml htmlText={product.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return product && productView();
};

export default ProductView;
