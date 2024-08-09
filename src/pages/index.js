import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";

function Index() {
  const showSuccesstoast = () => {
    toast.success("This is success messege");
  };

  const getData = () => {
    toast.info("Getting Data from the server");

    axios
      .get("http://localhost:9090/role")
      .then((response) => {
        console.log(response.data);
        toast.success("Request done");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  return (
    <Base
      title="Shop What you need"
      description={
        "Welcome to Trending Store, We provide best items as you required"
      }
      buttonEnabled={true}
      buttonText="Start Shopping"
      buttonType="success"
    >
      <h1>Working on home page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        temporibus mollitia, eos labore placeat numquam quaerat libero nemo a
        corporis tempora repudiandae facilis. Ipsam, eveniet consequuntur! Ad
        reiciendis repellendus sint.
      </p>
      <div className="d-flex justify-content-center align-items-center">
        <Button variant="success" onClick={showSuccesstoast}>
          Tostify Success
        </Button>
        <Button variant="primary" onClick={getData}>
          Get data form fake API
        </Button>
      </div>
    </Base>
  );
}

export default Index;
