import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import Base from "../components/Base";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/user.service";
import { NavLink } from "react-router-dom";

const Register = () => {
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    gender: "",
  });

  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const clearData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      gender: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    //validate client side
    if (data.name === undefined || data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    if (
      data.confirmPassword === undefined ||
      data.confirmPassword.trim() === ""
    ) {
      toast.error("ConfirmPassword is required");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password doesn't match");
      return;
    }

    setLoading(true);
    registerUser(data)
      .then((data) => {
        console.log(data);
        toast.success("User created successfully");
        clearData();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorData({
          isError: true,
          errorData: error,
        });
        toast.error("Error is creating user Try again with valid details");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const registerForm = () => {
    return (
      <Container>
        {/* Single Row ==> 12 Grids (col) */}
        <Row>
          {/* {JSON.stringify(data)} */}
          {/* 6grids */}
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-2 border-0 shadow p-3"
              style={{
                position: "relative",
                top: -60,
              }}
            >
              <CardBody>
                <Container className="text-center mb-3">
                  <img src={Logo} alt="Store" height={50} width={50} />
                </Container>
                <h3 className="display-4 mb-3 text-center">
                  Store SignUp Here
                </h3>
                <Form noValidate onSubmit={submitForm}>
                  {/* Name field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name here"
                      onChange={(event) => handleChange(event, "name")}
                      value={data.name}
                      isInvalid={errorData.errorData?.response?.data?.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* Email field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Email here"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                      isInvalid={errorData.errorData?.response?.data?.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* Password field */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your Password here"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                      isInvalid={errorData.errorData?.response?.data?.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* Confirm Password field */}
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Re-enter your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter your Password here"
                      onChange={(event) =>
                        handleChange(event, "confirmPassword")
                      }
                      value={data.confirmPassword}
                      isInvalid={
                        errorData.errorData?.response?.data?.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* Select Gender */}
                  <FormGroup className="mb-2" controlId="formgender">
                    <Form.Label>Select Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        name="gender"
                        label="Male"
                        type={"radio"}
                        id={`gender`}
                        value={"male"}
                        checked={data.gender === "male"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        type={"radio"}
                        id={`gender`}
                        value={"female"}
                        checked={data.gender === "female"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                    </div>
                  </FormGroup>
                  {/* description */}
                  <FormGroup className="mb-2" controlId="formdescription">
                    <Form.Label>About You</Form.Label>
                    <FormControl
                      as={"textarea"}
                      placeholder="write here"
                      rows={6}
                      onChange={(event) => handleChange(event, "about")}
                      value={data.about}
                    ></FormControl>
                  </FormGroup>

                  <Container>
                    <p className="text-center">
                      Already registered ! <NavLink to="/login">Login</NavLink>
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button
                      type="submit"
                      className="text-uppercase"
                      variant="success"
                      disabled={loading}
                    >
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                        hidden={!loading}
                      />
                      <span hidden={!loading}>Wait...</span>
                      <span hidden={loading}>Register</span>
                    </Button>
                    <Button
                      className="ms-4 text-uppercase"
                      variant="danger"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base
      title="Electro Store / SignUp"
      description="Fill the form correctly to connect with us"
    >
      {registerForm()}
    </Base>
  );
};

export default Register;
