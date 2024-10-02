import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";

const LoadingComp = ({ show }) => {
  return (
    show && (
      <Container className="text-center p-4">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
        {/* <Spinner size='lg'/> */}
      </Container>
    )
  );
};

export default LoadingComp;
