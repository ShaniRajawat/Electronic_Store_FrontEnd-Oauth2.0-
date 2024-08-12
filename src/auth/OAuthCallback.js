import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { getCurrentUser } from "../services/user.service";
import UserContext from "../context/user.context";

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
            "http://localhost:9091/oauth/token",
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

          userContext.login(userData, tokenData);

          toast.success("Login Successfully");
          // Redirect to Dashboard
          navigate("/users/home");
        } catch (error) {
          console.error("Error fetching the access token", error);
          toast.error("Login Failed");
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
    <div>
      <h2 className="text-center">
        Processing Login...{" "}
        <Spinner
          animation="border"
          size="sm"
          className="me-2"
          hidden={!loading}
        />
      </h2>
    </div>
  );
};

export default Callback;
