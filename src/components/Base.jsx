import { Container } from "react-bootstrap";
import Footer from "../components/Footer";

const Base = ({
  title = "Page Title",
  description = "Welcome to dynamic store",
  children,
}) => {
  return (
    <div>
      <Container fluid>
        <h3 className="text-center">{title}</h3>
        <p className="text-center">{description}</p>
      </Container>

      {children}
      <Footer/>
    </div>
  );
};

export default Base;
