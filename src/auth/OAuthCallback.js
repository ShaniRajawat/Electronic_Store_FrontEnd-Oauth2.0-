import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authCode = queryParams.get("code");
    console.log(authCode);

    if (authCode) {
      setLoading(true);
      const fetchAccessToken = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8081/oauth/token",
            new URLSearchParams({
              grant_type: "authorization_code",
              code: authCode,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic Y2xpZW50OnNlY3JldA==",
              },
            }
          );

          const accessToken = response.data.access_token;
          console.log(accessToken);

          // Save the access token
          localStorage.setItem("access_token", accessToken);

          // Redirect to DashBoard
          //If normal user then Normal user dashboard
          navigate("/users/home");
          toast.success("Login Succesfully");
          setLoading(false);
        } catch (error) {
          console.error("Error fetching the access token", error);
        }
      };

      fetchAccessToken();
    }
  }, [location.search, navigate]);

  return (
    <div>
      <h2 className="text-center">
        Processing Login...{" "}
        <Spinner
          animation="border"
          size="sm"
          className="me-2"
          hidden={loading}
        />
      </h2>
    </div>
  );
};

export default Callback;
