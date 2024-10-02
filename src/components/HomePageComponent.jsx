import {
  InputGroup,
  Form,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Button,
} from "react-bootstrap";
import SingleProductCard from "./users/SingleProductCard";
import React, { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

export const TrendingProducts = (products) => {
  return (
    <Container>
      <Row>
        <h3 className="text-center">Trending Products</h3>
        {products.map((product) => (
          <Col md={4}>
            <SingleProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const infoWithImageSection = (image, text, title) => {
  return (
    <Container>
      <Row>
        <Col style={{}} className="text-center">
          <h3>{title}</h3>
          <p>{text}</p>
          <Button>Store</Button>
        </Col>
        <Col className="text-center">
          <img src={image} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export const infoWithImageSection2 = (image, text, title) => {
  return (
    <Container>
      <Row>
        <Col style={{}} className="text-center">
          <img src={image} alt="" />
        </Col>
        <Col className="text-center">
          <h3>{title}</h3>
          <p>{text}</p>
          <Button>Store</Button>
        </Col>
      </Row>
    </Container>
  );
};

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <section className="bg-light py-3 py-md-5">
      <Card>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={10} lg={8} xl={7} xxl={6}>
              <h2 className="mb-4 display-5 text-center">Contact</h2>
              <p className="text-secondary mb-5 text-center">
                The best way to contact us is to use our contact form below.
                Please fill out all of the required fields and we will get back
                to you as soon as possible.
              </p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="justify-content-lg-center">
            <Col xs={12} lg={9}>
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <Form onSubmit={handleSubmit} className="p-4 p-xl-5">
                  <Row className="gy-4 gy-xl-5">
                    <Col xs={12}>
                      <Form.Group controlId="fullname">
                        <Form.Label>
                          Full Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>
                          Email <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiMail />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FiPhone />
                          </InputGroup.Text>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="message">
                        <Form.Label>
                          Message <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <div className="d-grid">
                        <Button variant="primary" size="lg" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </section>
  );
};
