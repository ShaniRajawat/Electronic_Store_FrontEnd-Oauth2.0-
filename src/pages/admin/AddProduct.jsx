import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    live: false,
    stock: true,
    brandName: "",
    productImageName: undefined,
    preview: undefined,
  });

  const handleFileChange=(event)=>{
    console.log(event.target.files[0]);

    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          preview:r.target.result,
          productImageName: event.target.files[0],
        })

      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File type");
      setProduct({
        ...product,
        productImageName:undefined,
        preview:undefined,
      })
    }
  }

  const formView = () => {
    return (
      <>
        <Card className="border border-0 shadow">
          <Card.Body>
            <h5>Add Product Here</h5>
            <Form>
              {/* Product Title */}
              <Form.Group className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      title: event.target.value,
                    })
                  }
                  value={product.title}
                />
              </Form.Group>
              {/* Product Description */}
              <Form.Group className="mt-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  rows={6}
                  as={"textarea"}
                  placeholder="Enter Here"
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      description: event.target.value,
                    })
                  }
                  value={product.description}
                />
              </Form.Group>
              <Row>
                <Col>
                  {/* Product Price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          price: event.target.value,
                        })
                      }
                      value={product.price}
                      type="number"
                      placeholder="Enter Here"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* Product Discounted Price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        if (event.target.value > product.price) {
                          toast.error(
                            "Invalid Discounted Price It should be less than price"
                          );
                          return;
                        }
                        setProduct({
                          ...product,
                          discountedPrice: event.target.value,
                        });
                      }}
                      value={product.discountedPrice}
                      type="number"
                      placeholder="Enter Here"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3 px-1">
                <Col>
                  {/* Probuct Quantity */}
                  <Form.Group className="mt-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          quantity: event.target.value,
                        })
                      }
                      value={product.quantity}
                      type="number"
                      placeholder="Enter Here"
                    />
                  </Form.Group>{" "}
                </Col>
                <Col>
                  {/* Brand Name */}
                  <Form.Group className="mt-3">
                    <Form.Label>Brand Name</Form.Label>
                    <Form.Control
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          brandName: event.target.value,
                        })
                      }
                      value={product.brandName}
                      type="text"
                      placeholder="Enter Brand name Here"
                    />
                  </Form.Group>{" "}
                </Col>
              </Row>

              <Row className="mt-3 px-1">
                <Col>
                  <Form.Check
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: !product.live,
                      })
                    }
                    checked={product.live}
                    value={true}
                    type="switch"
                    label={"Live"}
                  />
                </Col>
                <Col>
                  <Form.Check
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      })
                    }
                    checked={product.stock}
                    value={true}
                    type="switch"
                    label={"Stock"}
                  />
                </Col>
                {/* Product Image */}
                <Form.Group>
                  <Container className="text-center py-4 border border-3">
                    <p className="text-muted">
                      Image Preview
                    </p>
                    <img style={{
                      maxHeight: "250px"
                    }} className="img-fluid" src={product.preview} alt=""/>
                  </Container>
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control onChange={(event)=>handleFileChange(event)} type={"file"} />
                </Form.Group>
              </Row>
              <Container className="text-center mt-3">
                <Button variant="success" size="sm">
                  Add Product
                </Button>
                <Button className="ms-2" variant="warning" size="sm">
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};
export default AddProduct;
