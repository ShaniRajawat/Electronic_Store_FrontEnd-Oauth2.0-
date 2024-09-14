import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { getCurrentUser } from "../services/user.service";
import UserContext from "../context/UserContext";
import { BASE_URL_A } from "../services/helper.service";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authCode = queryParams.get("code");

    if (authCode) {
      setLoading(true);
      const fetchAccessToken = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL_A}/oauth/token`,
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

          const tokenData = response.data;

          const userData = await getCurrentUser(tokenData.access_token);

          //data: save in LocalStorage
          localStorage.setItem("userData", JSON.stringify(userData));

          userContext.login(tokenData);
          toast.success("Login Successfully");
          navigate("/users/home");
        } catch (error) {
          console.error("Error during login process", error);
          toast.error("Login Failed: " + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAccessToken();
    } else {
      toast.error("Authorization code not found");
    }
  }, [location.search, navigate, userContext]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h2 className="mb-3">Processing Login...</h2>
        {loading && (
          <Spinner
            animation="border"
            size="lg"
            variant="primary"
            className="me-2"
          />
        )}
      </div>
    </div>
  );
};

export default Callback;
