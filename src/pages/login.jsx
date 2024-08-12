import React from "react";
import { Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Base from "../components/Base";
import Logo from "../assets/logo.png";

const Login = () => {
  const handleLogin = () => {
    const authorizationUrl = `http://localhost:9091/oauth2/authorize?response_type=code&client_id=client&scope=write`;
    window.location.href = authorizationUrl;
  };

  const LogInn = () => {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card
              className="my-3 border-0 shadow"
              style={{
                position: 'relative',
                top: -40,
                height: 500,
                padding: '40px',
              }}
            >
              <CardBody className="text-center">
                <Container className="mb-4">
                  <img src={Logo} alt="Store" height={50} width={50} />
                </Container>
                <Row>
                  <Col className="d-flex flex-column align-items-center">
                    <h2 className="display-4 mb-4 text-center">
                      Welcome to Electronic Store
                      <br />
                      Login Here
                    </h2>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                  <Col xs="auto">
                    <Button onClick={handleLogin} className="btn btn-primary btn-lg">
                      Login
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <NavLink to="/register" className="btn btn-success btn-lg">
                      Register
                    </NavLink>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base title="Electro Store / Login" description="Login Here">
      {LogInn()}
    </Base>
  );
};

export default Login;
