import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Base from "../components/Base";
import Logo from "../assets/logo.png";

const Login = () => {

  const handleLogin = () => {
    const authorizationUrl = `http://localhost:8081/oauth2/authorize?response_type=code&client_id=client&scope=write`;
    window.location.href = authorizationUrl;
  };

  const loginButton = () => {
    return (
      <Card className="my-3 border-0 shadow">
        <div className="row h-90">
          <div className="col-md-5 d-flex align-items-center justify-content-center border-end">
            <img src={Logo} alt="Logo" height={350} />
          </div>

          <div className="col-md-6 d-flex flex-column border-start">
            <div className="d-flex align-items-center justify-content-center h-50">
              <h2>
                <pre className="text-center">
                  Welcome to Electronic Store{"\n"}
                  Login Here
                </pre>
              </h2>
            </div>
            <div className="d-flex align-items-center justify-content-center h-30">
              <div className="me-3">
                <button onClick={handleLogin} className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
              <div className="ms-3">
                <NavLink to="/register" className="btn btn-success btn-lg">
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Base title="Electro Store / Login" description="Login Here">
      {loginButton()}
    </Base>
  );
};

export default Login;